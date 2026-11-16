import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Admin from "@/models/Admin"
import {
  ADMIN_COOKIE_NAME,
  generateSalt,
  hashPassword,
  signSessionToken,
} from "@/lib/auth"

export const dynamic = "force-dynamic"
export const revalidate = 0

const DEFAULT_ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "admin@i-impact.org").toLowerCase().trim()
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "ImpactAdmin2026!"
const DEFAULT_ADMIN_NAME = process.env.ADMIN_NAME || "I-IMPACT Administrator"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email: rawEmail, password, rememberMe } = body

    if (!rawEmail || !password) {
      return NextResponse.json(
        { success: false, error: "Please enter both email/username and password." },
        { status: 400 }
      )
    }

    const email = rawEmail.toLowerCase().trim()

    await connectDB()

    // 1. Ensure at least one admin account exists in MongoDB
    let admin = await Admin.findOne({
      $or: [{ email }, { email: DEFAULT_ADMIN_EMAIL }],
    })

    if (!admin) {
      const adminCount = await Admin.countDocuments()
      if (adminCount === 0) {
        // Seed initial superadmin
        const salt = generateSalt()
        const passwordHash = await hashPassword(DEFAULT_ADMIN_PASSWORD, salt)
        admin = new Admin({
          name: DEFAULT_ADMIN_NAME,
          email: DEFAULT_ADMIN_EMAIL,
          passwordHash,
          salt,
          role: "superadmin",
          isActive: true,
        })
        await admin.save()
      }
    }

    // 2. Validate Credentials
    let isValid = false
    let adminRecord = null

    // Check by email or "admin" username alias
    if (admin && (admin.email === email || (email === "admin" && admin.email === DEFAULT_ADMIN_EMAIL))) {
      const computedHash = await hashPassword(password, admin.salt)
      if (computedHash === admin.passwordHash && admin.isActive) {
        isValid = true
        adminRecord = admin
      }
    }

    // Direct environment variable fallback for rescue access
    if (!isValid && (email === DEFAULT_ADMIN_EMAIL || email === "admin")) {
      if (password === DEFAULT_ADMIN_PASSWORD) {
        isValid = true
        adminRecord = {
          _id: "env-superadmin",
          name: DEFAULT_ADMIN_NAME,
          email: DEFAULT_ADMIN_EMAIL,
          role: "superadmin",
        }
      }
    }

    if (!isValid || !adminRecord) {
      return NextResponse.json(
        { success: false, error: "Invalid email/username or password. Please try again." },
        { status: 401 }
      )
    }

    // 3. Update lastLogin if it's a Mongoose document
    if ("save" in adminRecord && typeof (adminRecord as any).save === "function") {
      ;(adminRecord as any).lastLogin = new Date()
      await (adminRecord as any).save()
    }

    // 4. Generate signed session token
    const token = await signSessionToken(
      {
        adminId: String(adminRecord._id),
        name: adminRecord.name,
        email: adminRecord.email,
        role: adminRecord.role,
      },
      rememberMe ? 30 : 7
    )

    // 5. Build response and set HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      message: "Authentication successful.",
      admin: {
        name: adminRecord.name,
        email: adminRecord.email,
        role: adminRecord.role,
      },
    })

    const isProduction = process.env.NODE_ENV === "production"
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: (rememberMe ? 30 : 7) * 24 * 60 * 60,
    })

    return response
  } catch (error: any) {
    console.error("[Admin Login Error]:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process login request." },
      { status: 500 }
    )
  }
}
