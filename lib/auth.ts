import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// In a real application, you would use a proper authentication system
// like NextAuth.js, Clerk, or Auth0. This is a simplified version for demo purposes.

// Simulated admin credentials - in a real app, these would be stored securely in a database
// with properly hashed passwords
const ADMIN_CREDENTIALS = {
  username: "admin",
  // In production, never store passwords in plain text
  passwordHash: "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", // SHA-256 hash of 'admin'
}

export async function login(username: string, password: string) {
  // In a real app, you would hash the password and compare with stored hash
  // This is a simplified version for demo purposes
  const passwordHash = await hashPassword(password)

  if (username === ADMIN_CREDENTIALS.username && passwordHash === ADMIN_CREDENTIALS.passwordHash) {
    // Set a secure HTTP-only cookie with the session token
    // In a real app, you would generate a proper JWT or session token
    cookies().set("auth-token", "admin-session-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })
    return { success: true }
  }

  return { success: false, error: "Invalid credentials" }
}

export async function logout() {
  cookies().delete("auth-token")
}

export function getAuthToken() {
  return cookies().get("auth-token")?.value
}

export function isAuthenticated() {
  const token = getAuthToken()
  // In a real app, you would verify the token's validity
  return token === "admin-session-token"
}

export function requireAuth() {
  if (!isAuthenticated()) {
    redirect("/admin/login")
  }
}

// Simplified password hashing function
// In a real app, use a proper library like bcrypt
async function hashPassword(password: string): Promise<string> {
  // This is a simplified version using SHA-256
  // In production, use a proper password hashing library
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  return hashHex
}

