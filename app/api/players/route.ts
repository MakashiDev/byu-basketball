import { type NextRequest, NextResponse } from "next/server"
import { isAuthenticated } from "@/lib/auth"
import { players } from "@/data/players"

// In a real application, this would interact with a database
// This is a simplified version for demo purposes

export async function GET() {
  return NextResponse.json({ players })
}

export async function POST(request: NextRequest) {
  // Check authentication
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const newPlayer = await request.json()

    // Validate required fields
    if (!newPlayer.name || !newPlayer.height || !newPlayer.year || !newPlayer.hometown) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate a new ID (in a real app, the database would handle this)
    const maxId = Math.max(...players.map((p) => p.id), 0)
    const playerWithId = {
      ...newPlayer,
      id: maxId + 1,
    }

    // Add to the players array (in a real app, this would be saved to a database)
    players.push(playerWithId)

    return NextResponse.json({ player: playerWithId })
  } catch (error) {
    console.error("Error creating player:", error)
    return NextResponse.json({ error: "Failed to create player" }, { status: 500 })
  }
}

