import { PlayerStatusDashboard } from "@/components/player-status-dashboard"
import { SiteHeader } from "@/components/site-header"
import { prisma } from "@/lib/prisma"


export default async function Home() {
  const players = await prisma.player.findMany()
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <PlayerStatusDashboard players={players} />
    </main>
  )
}

