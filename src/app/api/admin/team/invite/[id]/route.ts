import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import crypto from "crypto"
import connectDB from "@/lib/mongodb"
import AdminInvite from "@/models/AdminInvite"
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/auth"
import { sendEmailBroadcast } from "@/lib/email"

export const dynamic = "force-dynamic"
export const revalidate = 0

interface RouteContext {
  params: Promise<{ id: string }>
}

async function getAuthenticatedAdmin(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value
  if (!token) return null
  return await verifySessionToken(token)
}

// POST: Resend an invitation email with a refreshed token
export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const session = await getAuthenticatedAdmin(request)
    if (!session || session.role !== "superadmin") {
      return NextResponse.json(
        { success: false, error: "Only Super Administrators can manage invitations." },
        { status: 403 }
      )
    }

    const { id } = await context.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid invite ID" }, { status: 400 })
    }

    await connectDB()

    const invite = await AdminInvite.findById(id)
    if (!invite) {
      return NextResponse.json({ success: false, error: "Invitation not found" }, { status: 404 })
    }

    if (invite.status === "accepted") {
      return NextResponse.json(
        { success: false, error: "This invitation has already been accepted." },
        { status: 400 }
      )
    }

    // Refresh token and expiration
    const newToken = crypto.randomBytes(32).toString("hex")
    invite.token = newToken
    invite.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    invite.status = "pending"
    await invite.save()

    const origin =
      request.headers.get("origin") ||
      request.headers.get("referer") ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000"
    const baseUrl = origin.replace(/\/$/, "")
    const inviteUrl = `${baseUrl}/admin/accept-invite?token=${newToken}`

    const roleLabels: Record<string, string> = {
      superadmin: "Super Administrator",
      admin: "Administrator",
      reviewer: "Reviewer",
      content_manager: "Content Manager",
    }
    const roleLabel = roleLabels[invite.role] || "Administrator"

    await sendEmailBroadcast({
      to: [invite.email],
      subject: `I-IMPACT: Reminder - Invitation to Join Administrative Team (${roleLabel})`,
      title: "Administrator Portal Invitation",
      message: `Hello ${invite.name},\n\nThis is a reminder that you have been invited to join the I-IMPACT administration console as a ${roleLabel}.\n\nPlease click the button below to complete your registration and create your account password. This secure link is valid for 7 days.`,
      actionUrl: inviteUrl,
      actionLabel: "Accept Invitation & Set Password",
      category: "Invitation",
    })

    return NextResponse.json({
      success: true,
      message: `Invitation resent to ${invite.email}`,
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
    console.error("[Invite Resend Error]:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to resend invitation" },
      { status: 500 }
    )
  }
}

// DELETE: Revoke / delete invitation
export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const session = await getAuthenticatedAdmin(request)
    if (!session || session.role !== "superadmin") {
      return NextResponse.json(
        { success: false, error: "Only Super Administrators can manage invitations." },
        { status: 403 }
      )
    }

    const { id } = await context.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid invite ID" }, { status: 400 })
    }

    await connectDB()

    const deleted = await AdminInvite.findByIdAndDelete(id)
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Invitation not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: `Invitation for ${deleted.email} revoked.`,
    })
  } catch (error: any) {
    console.error("[Invite Revoke Error]:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to revoke invitation" },
      { status: 500 }
    )
  }
}

