import { notFound } from "next/navigation"
import { PlayerForm } from "@/components/admin/player-form"
import { players } from "@/data/players"

export default function EditPlayerPage({ params }: { params: { id: string } }) {
  const playerId = Number.parseInt(params.id)
  const player = players.find((p) => p.id === playerId)

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

