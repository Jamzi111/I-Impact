import { NextRequest, NextResponse } from "next/server"
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/auth"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value

  if (!token) {
    return NextResponse.json({ authenticated: false })
  }

  const payload = await verifySessionToken(token)

  if (!payload) {
    return NextResponse.json({ authenticated: false })
  }

  return NextResponse.json({
    authenticated: true,
    admin: {
      adminId: payload.adminId,
      name: payload.name,
      email: payload.email,
      role: payload.role,
    },
  })
}

