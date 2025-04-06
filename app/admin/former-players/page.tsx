import { prisma } from "@/lib/prisma"
import { FormerPlayersDashboard } from "@/components/admin/former-players-dashboard"

export default async function FormerPlayersPage() {
  const formerPlayers = await prisma.player.findMany({
    where: {
      formerPlayer: true
    },
    orderBy: {
      name: 'asc'
    }
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#002E5D]">Former Players 2024-25</h1>
        <p className="text-gray-500">Players who have graduated, transferred, or entered the NBA draft</p>
      </div>

      <FormerPlayersDashboard formerPlayers={formerPlayers} />
    </div>
  )
}