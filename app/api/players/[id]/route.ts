import { type NextRequest, NextResponse } from "next/server"
import { isAuthenticated } from "@/lib/auth"
import { players } from "@/data/players"

// In a real application, this would interact with a database
// This is a simplified version for demo purposes

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const player = players.find((p) => p.id === id)

  if (!player) {
    return NextResponse.json({ error: "Player not found" }, { status: 404 })
  }

  return NextResponse.json({ player })
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  // Check authentication
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const id = Number.parseInt(params.id)
    const updatedPlayer = await request.json()
    const index = players.findIndex((p) => p.id === id)

    if (index === -1) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 })
    }

    // Update the player (in a real app, this would update a database record)
    players[index] = { ...players[index], ...updatedPlayer, id }

    return NextResponse.json({ player: players[index] })
  } catch (error) {
    console.error("Error updating player:", error)
    return NextResponse.json({ error: "Failed to update player" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  // Check authentication
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const id = Number.parseInt(params.id)
    const index = players.findIndex((p) => p.id === id)

    if (index === -1) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 })
    }

    // Remove the player (in a real app, this would delete from a database)
    const deletedPlayer = players[index]
    players.splice(index, 1)

    return NextResponse.json({ player: deletedPlayer })
  } catch (error) {
    console.error("Error deleting player:", error)
    return NextResponse.json({ error: "Failed to delete player" }, { status: 500 })
  }
}

