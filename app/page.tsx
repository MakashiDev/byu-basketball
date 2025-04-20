import { PlayerStatusDashboard } from "@/components/player-status-dashboard"
import { SiteHeader } from "@/components/site-header"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function Home() {
  const players = await prisma.player.findMany()

  const order = {
    committed: 1,
    projected: 2,
    returning: 3,
    likely: 4,
    unconfirmed: 5,
    graduated: 6  ,
    nbaDraft: 7,
    transferred: 8,
    transfer: 9
  };

  const sortedPlayers = players.sort((a, b) => {
    return (order[a.status as keyof typeof order] ?? 99) - (order[b.status as keyof typeof order] ?? 99);
  });
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <PlayerStatusDashboard players={sortedPlayers} />
    </main>
  )
}

