import { type NextRequest, NextResponse } from "next/server"
import { isAuthenticated } from "./lib/auth"

export function middleware(request: NextRequest) {
  // Check if the request is for the admin area
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Skip authentication check for the login page
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next()
    }

    // Check if the user is authenticated
    if (!isAuthenticated()) {
      // Redirect to login page if not authenticated
      const loginUrl = new URL("/admin/login", request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

