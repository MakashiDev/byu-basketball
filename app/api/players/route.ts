import { type NextRequest, NextResponse } from "next/server"
import { isAuthenticated } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const players = await prisma.player.findMany()
    return NextResponse.json({ players })
  } catch (error) {
    console.error("Error fetching players:", error)
    return NextResponse.json({ error: "Failed to fetch players" }, { status: 500 })
  }
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

    // Create player in the database
    const player = await prisma.player.create({
      data: {
        jerseyNumber: newPlayer.jerseyNumber,
        name: newPlayer.name,
        position: newPlayer.position || null,
        height: newPlayer.height,
        year: newPlayer.year,
        hometown: newPlayer.hometown,
        highSchoolOrPrevTeam: newPlayer.highSchoolOrPrevTeam,
        status: newPlayer.status,
        stats: newPlayer.stats || null,
        image: newPlayer.image || null,
      },
    })

    return NextResponse.json({ player })
  } catch (error) {
    console.error("Error creating player:", error)
    return NextResponse.json({ error: "Failed to create player" }, { status: 500 })
  }
}

