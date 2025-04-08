import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// Environment variables for authentication
// These should be set in .env.local file or through environment variables in production
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || "admin",
  passwordHash: process.env.ADMIN_PASSWORD_HASH || "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", // Default SHA-256 hash of 'admin'
}

// Auth configuration
const AUTH_CONFIG = {
  tokenName: process.env.AUTH_TOKEN_NAME || "auth-token",
  tokenExpiry: parseInt(process.env.AUTH_TOKEN_EXPIRY || "86400"),
  secret: process.env.AUTH_SECRET || "fallback-secret-key-please-set-in-env-vars",
  saltRounds : parseInt(process.env.AUTH_SALT_ROUNDS || "10"),
}

export async function login(username: string, password: string) {
  try {
    const passwordHash = await hashPassword(password)
    console.log(passwordHash)

    if (username === ADMIN_CREDENTIALS.username && passwordHash === ADMIN_CREDENTIALS.passwordHash) {
      // Generate a session token
      const token = await generateSessionToken(username)
      
      // Set a secure HTTP-only cookie with the session token
      await (await cookies()).set(AUTH_CONFIG.tokenName, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: AUTH_CONFIG.tokenExpiry,
        path: "/",
        sameSite: "lax", // Provides CSRF protection
      })
      
      return { success: true }
    }

    return { success: false, error: "Invalid credentials" }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, error: "Authentication failed" }
  }
}

export async function logout() {
  (await cookies()).delete(AUTH_CONFIG.tokenName)
}

export async function getAuthToken() {
  return (await cookies()).get(AUTH_CONFIG.tokenName)?.value
}

export async function isAuthenticated() {
  try {
    const token = await getAuthToken()
    
    if (!token) {
      return false
    }
    
    // In a production app, you would verify the token signature and expiration
    // This is a simplified version that checks if the token exists and has the expected format
    return validateSessionToken(token)
  } catch (error) {
    console.error("Authentication error:", error)
    return false
  }
}

export async function requireAuth() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login")
  }
}


export async function hashPassword(password: string): Promise<string> {
  const hash = await bcrypt.hash(password, AUTH_CONFIG.saltRounds)
  console.log(hash, AUTH_CONFIG.saltRounds)
  return hash
}

export function generateSessionToken(username: string): string {
  const payload = {
    username,
    iat: Math.floor(Date.now() / 1000) // issued at (optional, added by default)
  }

  const token = jwt.sign(payload, AUTH_CONFIG.secret, {
    expiresIn: "7d" // token valid for 7 days
  })

  return token
}


// Validate a session token
export function validateSessionToken(token: string): boolean {
  try {
    // Will throw if token is invalid or expired
    jwt.verify(token, AUTH_CONFIG.secret)
    return true
  } catch (err) {
    console.error("Invalid or expired token:", err)
    return false
  }
}
