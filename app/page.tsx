import { PlayerStatusDashboard } from "@/components/player-status-dashboard"
import { SiteHeader } from "@/components/site-header"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function Home() {
  const players = await prisma.player.findMany()

  const order = {
    returning: 1,
    likely: 1.5,
    committed: 2,
    transfered: 3,
    projected: 4,
    unconfirmed: 5,
    nbaDraft: 6,
    graduated: 7  ,
    transfer: 8
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

