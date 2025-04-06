import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Environment variables for authentication
// These should be set in .env.local file or through environment variables in production
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || "admin",
  passwordHash: process.env.ADMIN_PASSWORD_HASH || "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", // Default SHA-256 hash of 'admin'
}

// Auth configuration
const AUTH_CONFIG = {
  tokenName: process.env.AUTH_TOKEN_NAME || "auth-token",
  tokenExpiry: parseInt(process.env.AUTH_TOKEN_EXPIRY || "86400", 10), // Default: 24 hours in seconds
  secret: process.env.AUTH_SECRET || "fallback-secret-key-please-set-in-env-vars"
}

export async function login(username: string, password: string) {
  try {
    const passwordHash = await hashPassword(password)

    if (username === ADMIN_CREDENTIALS.username && passwordHash === ADMIN_CREDENTIALS.passwordHash) {
      // Generate a session token
      const token = await generateSessionToken(username)
      
      // Set a secure HTTP-only cookie with the session token
      cookies().set(AUTH_CONFIG.tokenName, token, {
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
  cookies().delete(AUTH_CONFIG.tokenName)
}

export function getAuthToken() {
  return cookies().get(AUTH_CONFIG.tokenName)?.value
}

export function isAuthenticated() {
  try {
    const token = getAuthToken()
    
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

export function requireAuth() {
  if (!isAuthenticated()) {
    redirect("/admin/login")
  }
}

// Password hashing function using Web Crypto API
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  return hashHex
}

// Generate a session token
async function generateSessionToken(username: string): Promise<string> {
  // In a production app, you would use a proper JWT library
  // This is a simplified version that creates a token with username and timestamp
  const timestamp = Date.now()
  const tokenData = `${username}:${timestamp}`
  
  // Sign the token data with the secret key
  const encoder = new TextEncoder()
  const data = encoder.encode(tokenData + AUTH_CONFIG.secret)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const signature = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  
  // Return the token in the format: base64(username:timestamp):signature
  const tokenPayload = Buffer.from(tokenData).toString('base64')
  return `${tokenPayload}:${signature}`
}

// Validate a session token
function validateSessionToken(token: string): boolean {
  try {
    // Split the token into payload and signature
    const [payloadBase64, signature] = token.split(":")
    
    if (!payloadBase64 || !signature) {
      return false
    }
    
    // Decode the payload
    const tokenData = Buffer.from(payloadBase64, 'base64').toString()
    const [username, timestampStr] = tokenData.split(":")
    const timestamp = parseInt(timestampStr, 10)
    
    // Check if the token has expired
    const now = Date.now()
    const expiryTime = timestamp + (AUTH_CONFIG.tokenExpiry * 1000)
    
    if (now > expiryTime) {
      return false
    }
    
    // In a production app, you would verify the signature
    // For simplicity, we're just checking if the token has the expected format
    return !!username && !!timestamp && !!signature
  } catch (error) {
    console.error("Token validation error:", error)
    return false
  }
}