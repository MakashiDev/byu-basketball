import { notFound } from "next/navigation"
import { PlayerForm } from "@/components/admin/player-form"
import type { Player } from "@prisma/client"
import { prisma } from "@/lib/prisma"



export default async function EditPlayerPage({ params }: { params: { id: string } }) {
  await params;
  console.log(await params.id)
  const playerId = Number.parseInt(params.id)
  const player = await prisma.player.findUnique(
    {
      where: {
        id: playerId,
      },
    }
  )

  if (!player) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#002E5D]">Edit Player</h1>
        <p className="text-gray-500">Update player information and status</p>
      </div>

      <PlayerForm player={player} />
    </div>
  )
}

