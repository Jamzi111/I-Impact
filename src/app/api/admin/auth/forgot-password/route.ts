import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import connectDB from "@/lib/mongodb"
import Admin from "@/models/Admin"
import { sendEmailBroadcast } from "@/lib/email"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function POST(request: NextRequest) {
  try {
    const { email: rawEmail } = await request.json()

    if (!rawEmail || typeof rawEmail !== "string") {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      )
    }

    const email = rawEmail.toLowerCase().trim()

    await connectDB()

    const admin = await Admin.findOne({ email, isActive: true })

    // Generic response to avoid email enumeration
    const genericResponse = {
      success: true,
      message: "If an active account exists, password recovery instructions have been sent.",
    }

    if (!admin) {
      return NextResponse.json(genericResponse)
    }

    // Generate random 32-byte hex token
    const resetToken = crypto.randomBytes(32).toString("hex")
    const expires = new Date(Date.now() + 1000 * 60 * 60) // 1 hour expiration

    admin.resetPasswordToken = resetToken
    admin.resetPasswordExpires = expires
    await admin.save()

    // Build reset link
    const origin =
      request.headers.get("origin") ||
      request.headers.get("referer") ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000"
    const baseUrl = origin.replace(/\/$/, "")
    const resetUrl = `${baseUrl}/admin/reset-password?token=${resetToken}`

    await sendEmailBroadcast({
      to: [admin.email],
      subject: "I-IMPACT: Password Recovery Instructions",
      title: "Password Recovery Request",
      message: `Hello ${admin.name},\n\nA request was made to reset your administrator password for the I-IMPACT management console.\n\nClick the link below to set a new password. This link is valid for 1 hour.\n\nIf you did not request this, please disregard this email. Your account remains secure.`,
      actionUrl: resetUrl,
      actionLabel: "Reset Administrator Password",
      category: "Security Notice",
    })

    return NextResponse.json(genericResponse)
  } catch (error: any) {
    console.error("[Forgot Password Error]:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process request" },
      { status: 500 }
    )
  }
}
