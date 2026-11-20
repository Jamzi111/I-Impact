import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import connectDB from "@/lib/mongodb"
import Admin from "@/models/Admin"
import AdminInvite from "@/models/AdminInvite"
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/auth"
import { sendEmailBroadcast } from "@/lib/email"

export const dynamic = "force-dynamic"
export const revalidate = 0

// Helper to authenticate request
async function getAuthenticatedAdmin(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value
  if (!token) return null
  return await verifySessionToken(token)
}

// GET: List all administrators and pending invites
export async function GET(request: NextRequest) {
  try {
    const session = await getAuthenticatedAdmin(request)
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const admins = await Admin.find({}, { passwordHash: 0, salt: 0 })
      .sort({ createdAt: -1 })
      .lean()

    const invites = await AdminInvite.find({})
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json({
      success: true,
      currentRole: session.role,
      currentAdminId: session.adminId,
      admins: admins.map((a: any) => ({
        ...a,
        _id: a._id.toString(),
      })),
      invites: invites.map((i: any) => ({
        ...i,
        _id: i._id.toString(),
      })),
    })
  } catch (error: any) {
    console.error("[Admin Team GET Error]:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load team" },
      { status: 500 }
    )
  }
}

// POST: Invite a new administrator (Super Admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getAuthenticatedAdmin(request)
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    // Only superadmin can invite other administrators
    if (session.role !== "superadmin") {
      return NextResponse.json(
        { success: false, error: "Only Super Administrators can invite new team members." },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { name, email: rawEmail, role = "admin" } = body

    if (!name || !rawEmail) {
      return NextResponse.json(
        { success: false, error: "Full name and email address are required." },
        { status: 400 }
      )
    }

    const email = rawEmail.toLowerCase().trim()

    await connectDB()

    // 1. Check if an active administrator with this email already exists
    const existingAdmin = await Admin.findOne({ email })
    if (existingAdmin) {
      return NextResponse.json(
        {
          success: false,
          error: `An administrator account with email ${email} already exists.`,
        },
        { status: 400 }
      )
    }

    // 2. Invalidate any prior pending invites for this email
    await AdminInvite.updateMany(
      { email, status: "pending" },
      { $set: { status: "revoked" } }
    )

    // 3. Create fresh expiring invitation
    const token = crypto.randomBytes(32).toString("hex")
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

    const invite = new AdminInvite({
      name: name.trim(),
      email,
      role,
      token,
      invitedBy: session.name || "Super Admin",
      expiresAt,
      status: "pending",
    })

    await invite.save()

    // 4. Dispatch official invitation email
    const origin =
      request.headers.get("origin") ||
      request.headers.get("referer") ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000"
    const baseUrl = origin.replace(/\/$/, "")
    const inviteUrl = `${baseUrl}/admin/accept-invite?token=${token}`

    const roleLabels: Record<string, string> = {
      superadmin: "Super Administrator",
      admin: "Administrator",
      reviewer: "Reviewer",
      content_manager: "Content Manager",
    }
    const roleLabel = roleLabels[role] || "Administrator"

    const emailResult = await sendEmailBroadcast({
      to: [email],
      subject: `I-IMPACT: Invitation to Join Administrative Team (${roleLabel})`,
      title: "Administrator Portal Invitation",
      message: `Hello ${name},\n\nYou have been invited by ${session.name || "the I-IMPACT Directorate"} to join the I-IMPACT administration console as a ${roleLabel}.\n\nAs an authorized administrator, you will have secure access to manage cohort operations, review applicants, and coordinate initiative milestones.\n\nPlease click the button below to accept your invitation and create your account password. This secure link is valid for 7 days.`,
      actionUrl: inviteUrl,
      actionLabel: "Accept Invitation & Set Password",
      category: "Invitation",
    })

    const message = emailResult.success
      ? `Invitation sent to ${email}`
      : `Invitation created! Note: ${emailResult.note || "Check email delivery logs"}`

    return NextResponse.json({
      success: true,
      message,
      emailDelivered: emailResult.success,
      invite: {
        _id: invite._id.toString(),
        name: invite.name,
        email: invite.email,
        role: invite.role,
        status: invite.status,
        expiresAt: invite.expiresAt,
        token: invite.token,
      },
    })
  } catch (error: any) {
    console.error("[Admin Invite POST Error]:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to dispatch invitation" },
      { status: 500 }
    )
  }
}

