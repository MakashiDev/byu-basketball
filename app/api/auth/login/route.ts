import { type NextRequest, NextResponse } from "next/server"
import { login } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ success: false, error: "Username and password are required" }, { status: 400 })
    }
    console.log("Login request received:", { username, password })
    const result = await login(username, password)

    if (result.success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, error: result.error || "Invalid credentials" }, { status: 401 })
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, error: "An error occurred during login" }, { status: 500 })
  }
}

