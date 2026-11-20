import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Admin from "@/models/Admin"
import { generateSalt, hashPassword } from "@/lib/auth"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json(
        { success: false, error: "Reset token and new password are required." },
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

    const admin = await Admin.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    })

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid or expired recovery token. Please request a new password recovery link.",
        },
        { status: 400 }
      )
    }

    // Hash the new password with fresh salt
    const salt = generateSalt()
    const passwordHash = await hashPassword(password, salt)

    admin.passwordHash = passwordHash
    admin.salt = salt
    admin.resetPasswordToken = undefined
    admin.resetPasswordExpires = undefined

    await admin.save()

    return NextResponse.json({
      success: true,
      message: "Password reset successfully. You can now log in.",
    })
  } catch (error: any) {
    console.error("[Reset Password Error]:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to reset password." },
      { status: 500 }
    )
  }
}
