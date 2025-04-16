import { type NextRequest, NextResponse } from "next/server"
import { isAuthenticated } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const id = Number.parseInt(params.id)
    const player = await prisma.player.findUnique({
      where: { id },
    })

    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 })
    }

    return NextResponse.json({ player })
  } catch (error) {
    console.error("Error fetching player:", error)
    return NextResponse.json({ error: "Failed to fetch player" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  // Check authentication
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const id = Number.parseInt(params.id)
    const updatedPlayer = await request.json()

    // Check if player exists
    const existingPlayer = await prisma.player.findUnique({
      where: { id },
    })

    if (!existingPlayer) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 })
    }

    // Update the player in the database
    const player = await prisma.player.update({
      where: { id },
      data: {
        jerseyNumber: updatedPlayer.jerseyNumber ?? existingPlayer.jerseyNumber,
        name: updatedPlayer.name ?? existingPlayer.name,
        position: updatedPlayer.position,
        height: updatedPlayer.height ?? existingPlayer.height,
        year: updatedPlayer.year ?? existingPlayer.year,
        hometown: updatedPlayer.hometown ?? existingPlayer.hometown,
        highSchoolOrPrevTeam: updatedPlayer.highSchoolOrPrevTeam ?? existingPlayer.highSchoolOrPrevTeam,
        status: updatedPlayer.status ?? existingPlayer.status,
        transferDestination: updatedPlayer.transferDestination,
        formerPlayer: updatedPlayer.formerPlayer ?? existingPlayer.formerPlayer,
        stats: updatedPlayer.stats,
        image: updatedPlayer.image,
      },
    })

    return NextResponse.json({ player })
  } catch (error) {
    console.error("Error updating player:", error)
    return NextResponse.json({ error: "Failed to update player" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  // Check authentication
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const id = Number.parseInt(params.id)

    // Check if player exists
    const existingPlayer = await prisma.player.findUnique({
      where: { id },
    })

    if (!existingPlayer) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 })
    }

    // Delete the player from the database
    const player = await prisma.player.delete({
      where: { id },
    })

    return NextResponse.json({ player })
  } catch (error) {
    console.error("Error deleting player:", error)
    return NextResponse.json({ error: "Failed to delete player" }, { status: 500 })
  }
}

