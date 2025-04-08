import { PlayerStatusDashboard } from "@/components/player-status-dashboard"
import { SiteHeader } from "@/components/site-header"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function Home() {
  const players = await prisma.player.findMany()

  const order = {
    returning: 0,
    committed: 1,
    unconfirmed: 2,
    nbaDraft: 3,
    graduated: 4,
    transfer: 5
  };

  const sortedPlayers = players.sort((a, b) => {
    return (order[a.status] ?? 99) - (order[b.status] ?? 99);
  });
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <PlayerStatusDashboard players={sortedPlayers} />
    </main>
  )
}

