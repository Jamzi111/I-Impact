import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Admin from "@/models/Admin"
import AdminInvite from "@/models/AdminInvite"
import {
  ADMIN_COOKIE_NAME,
  generateSalt,
  hashPassword,
  signSessionToken,
} from "@/lib/auth"

export const dynamic = "force-dynamic"
export const revalidate = 0

// GET: Validate invite token
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Missing invitation token." },
        { status: 400 }
      )
    }

    await connectDB()

    const invite = await AdminInvite.findOne({ token })
    if (!invite) {
      return NextResponse.json(
        { success: false, error: "Invalid invitation token. Please contact your administrator." },
        { status: 404 }
      )
    }

    if (invite.status === "accepted") {
      return NextResponse.json(
        {
          success: false,
          error: "This invitation has already been accepted. Please sign in with your password.",
        },
        { status: 400 }
      )
    }

    if (invite.status === "revoked") {
      return NextResponse.json(
        {
          success: false,
          error: "This invitation was revoked. Please request a new invitation.",
        },
        { status: 400 }
      )
    }

    if (new Date() > new Date(invite.expiresAt)) {
      return NextResponse.json(
        {
          success: false,
          error: "This invitation link has expired. Please ask a Super Admin to re-invite you.",
        },
        { status: 400 }
      )
    }

    const roleLabels: Record<string, string> = {
      superadmin: "Super Administrator",
      admin: "Administrator",
      reviewer: "Reviewer",
      content_manager: "Content Manager",
    }

    return NextResponse.json({
      success: true,
      invite: {
        name: invite.name,
        email: invite.email,
        role: invite.role,
        roleLabel: roleLabels[invite.role] || "Administrator",
      },
    })
  } catch (error: any) {
    console.error("[Accept Invite GET Error]:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to validate invitation" },
      { status: 500 }
    )
  }
}

// POST: Accept invitation and create account
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, password } = body

    if (!token || !password) {
      return NextResponse.json(
        { success: false, error: "Token and password are required." },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 8 characters long." },
        { status: 400 }
      )
    }

    await connectDB()

    const invite = await AdminInvite.findOne({
      token,
      status: "pending",
      expiresAt: { $gt: new Date() },
    })

    if (!invite) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid or expired invitation token. Please contact your organization administrator.",
        },
        { status: 400 }
      )
    }

    // Check if an admin with this email already exists
    let admin = await Admin.findOne({ email: invite.email })
    const salt = generateSalt()
    const passwordHash = await hashPassword(password, salt)

    if (admin) {
      admin.name = invite.name
      admin.role = invite.role
      admin.salt = salt
      admin.passwordHash = passwordHash
      admin.isActive = true
      admin.lastLogin = new Date()
      await admin.save()
    } else {
      admin = new Admin({
        name: invite.name,
        email: invite.email,
        role: invite.role,
        salt,
        passwordHash,
        isActive: true,
        lastLogin: new Date(),
      })
      await admin.save()
    }

    // Mark invitation as accepted
    invite.status = "accepted"
    invite.acceptedAt = new Date()
    await invite.save()

    // Sign session token so they are immediately logged in
    const sessionToken = await signSessionToken({
      adminId: admin._id.toString(),
      name: admin.name,
      email: admin.email,
      role: admin.role,
    })

    const response = NextResponse.json({
      success: true,
      message: "Account verified and created successfully. Welcome to I-IMPACT!",
      admin: {
        adminId: admin._id.toString(),
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    })

    // Set HTTP-only session cookie (7 days)
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    })

    return response
  } catch (error: any) {
    console.error("[Accept Invite POST Error]:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create administrator account" },
      { status: 500 }
    )
  }
}

