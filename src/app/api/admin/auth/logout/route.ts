import { NextRequest, NextResponse } from "next/server"
import { ADMIN_COOKIE_NAME } from "@/lib/auth"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function POST(request: NextRequest) {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully.",
  })

  // Clear session cookie
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  })

  return response
}

