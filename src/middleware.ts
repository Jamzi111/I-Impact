import { NextRequest, NextResponse } from "next/server"
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only apply to /admin routes
  if (pathname.startsWith("/admin")) {
    const isPublicAuthPage =
      pathname === "/admin/login" ||
      pathname === "/admin/forgot-password" ||
      pathname === "/admin/reset-password" ||
      pathname === "/admin/accept-invite"

    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value
    const session = token ? await verifySessionToken(token) : null
    const isAuthenticated = !!session

    // If already authenticated and trying to access login page, redirect to /admin
    if (pathname === "/admin/login" && isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", request.url))
    }

    // If NOT authenticated and trying to access protected admin page, redirect to login
    if (!isPublicAuthPage && !isAuthenticated) {
      const loginUrl = new URL("/admin/login", request.url)
      loginUrl.searchParams.set("from", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

