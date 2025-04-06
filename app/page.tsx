import { PlayerStatusDashboard } from "@/components/player-status-dashboard"
import { SiteHeader } from "@/components/site-header"
import { prisma } from "@/lib/prisma"


export default async function Home() {
  const players = await prisma.player.findMany()

  const order = {
    committed: 0,
    unconfirmed: 1,
    transfer: 2
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

