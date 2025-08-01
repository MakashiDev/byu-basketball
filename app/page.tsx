import { PlayerStatusDashboard } from "@/components/player-status-dashboard"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { prisma } from "@/lib/prisma"
import Script from "next/script"

export const dynamic = "force-dynamic"

export default async function Home() {
  const players = await prisma.player.findMany()
  const depthChart = await prisma.depthChart.findMany({
    include: {
      starter: true,
      backup1: true,
      backup2: true,
    },
  })

  const order = {
    committed: 1,
    projected: 2,
    returning: 3,
    likely: 4,
    unconfirmed: 5,
    graduated: 6  ,
    nbaDraft: 7,
    transferred: 8,
    transfer: 9,
    formerWalkOn: 10,
  };

  const sortedPlayers = players.sort((a, b) => {
    return (order[a.status as keyof typeof order] ?? 99) - (order[b.status as keyof typeof order] ?? 99);
  });

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SportsTeam",
    "name": "BYU Cougars Basketball",
    "sport": "Basketball",
    "league": "NCAA Division I",
    "conference": "Big 12 Conference",
    "season": "2025-2026",
    "url": "http://byu.christianfurr.dev/",
    "description": "BYU Basketball roster for the 2025-26 season with player information, depth chart, and team updates.",
    "athlete": sortedPlayers.map(player => ({
      "@type": "Person",
      "name": player.name,
      "jobTitle": player.position,
      "description": `${player.position} for BYU Basketball`,
      "height": player.height,
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "Brigham Young University"
      }
    })),
    "location": {
      "@type": "Place",
      "name": "Brigham Young University",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Provo",
        "addressRegion": "UT",
        "addressCountry": "US"
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader />
      <main className="flex-1">
        <PlayerStatusDashboard players={sortedPlayers} depthChart={depthChart}/>
      </main>
      <SiteFooter />
    </div>
  )
}

