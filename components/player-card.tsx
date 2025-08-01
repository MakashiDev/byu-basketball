import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Player } from "@prisma/client"

interface PlayerCardProps {
  player: Player
}

export function PlayerCard({ player }: PlayerCardProps) {
  const statusColors = {
    committed: "bg-green-600 hover:bg-green-600",
    projected: "bg-green-600 hover:bg-green-600",
    transfer: "bg-amber-600 hover:bg-amber-600",
    transferred: "bg-amber-600 hover:bg-amber-600",
    unconfirmed: "bg-gray-600 hover:bg-gray-600",
    likely: "bg-purple-600 hover:bg-purple-600",
    returning: "bg-purple-600 hover:bg-purple-600",
    graduated: "bg-blue-600 hover:bg-blue-600",
    nbaDraft: "bg-red-600 hover:bg-red-600",
    formerWalkOn: "bg-amber-600 hover:bg-amber-600",
  }

  const statusLabels = {
    committed: "Committed",
    projected: "Projected",
    transfer: "Transfer Portal",
    transferred: "Transferred",
    unconfirmed: "Unconfirmed",
    returning: "Returning",
    likely: "Likely Returning",
    graduated: "Graduated",
    nbaDraft: "NBA Draft",
    formerWalkOn: "Former Walk-On",
  }

  const getTeamLogo = (playerId: number) => {
    const teamLogos: Record<number, { src: string; alt: string }> = {
      19: { src: "https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/washington.sidearmsports.com/images/integration_2024/logo_main.svg", alt: "University Of Washington" },
      20: { src: "https://images.squarespace-cdn.com/content/v1/6696d414adc7aa4a82851e22/c26063c2-17ce-42a7-89db-2448f1eb0934/UP_Website.png", alt: "Utah Prep Logo" },
      18: { src: "https://images.squarespace-cdn.com/content/v1/6696d414adc7aa4a82851e22/c26063c2-17ce-42a7-89db-2448f1eb0934/UP_Website.png", alt: "Utah Prep Logo" },
      21: { src: "/images/baylor.webp", alt: "Baylor Bears" },
      22: { src: "/images/siu.webp", alt: "SIU Logo" },
      23: { src: "/images/vandals.webp", alt: "Idaho Vandals Logo" },
      24: { src: "/images/ucr.webp", alt: "UC Riverside Logo" },
      25: { src: "/images/lions.webp", alt: "Arkadia Traiskirchen Lions" },
    }
    return teamLogos[playerId] || { src: "/images/byu-logo.png", alt: "BYU Logo" }
  }

  const teamLogo = getTeamLogo(player.id)

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 rounded-lg shadow-md" role="article" aria-labelledby={`player-${player.id}-name`}>
      <div className="relative h-72 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#002E5D] dark:from-[#001a33] to-transparent z-10 opacity-70"></div>
        <div className="absolute top-0 right-0 z-20 p-2">
          <Badge className={`${statusColors[player.status as keyof typeof statusColors]} text-white font-medium px-3 py-1`} aria-label={`Player status: ${statusLabels[player.status as keyof typeof statusLabels]}`}>
            {statusLabels[player.status as keyof typeof statusLabels]}
          </Badge>
        </div>
        <div className="absolute top-0 left-0 z-20 p-2">
          <div className="bg-[#002E5D] dark:bg-[#001a33] text-white font-bold rounded-full w-8 h-8 flex items-center justify-center" aria-label={`Jersey number: ${player.jerseyNumber || "Unknown"}`}>
            {player.jerseyNumber || "?"}
          </div>
        </div>
        <Image
          src={player.image || `/placeholder.svg?height=288&width=288&text=${player.jerseyNumber}`}
          alt={`${player.name}, ${player.position} for BYU Basketball`}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
          <h3 id={`player-${player.id}-name`} className="font-bold text-xl text-white drop-shadow-md">{player.name}</h3>
          <p className="text-white/90 text-sm">{player.position}</p>
        </div>
      </div>
      <CardContent className="p-4 bg-card text-card-foreground">
        <dl className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <dt className="text-muted-foreground">Year</dt>
            <dd className="font-medium">{player.year}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Height</dt>
            <dd className="font-medium">{player.height}</dd>
          </div>
          <div className="">
            <dt className="text-muted-foreground">Hometown</dt>
            <dd className="font-medium">{player.hometown}</dd>
          </div>
          {player.status === "transferred"  && player.transferDestination && (
            <div>
              <dt className="text-muted-foreground">Transferring To</dt>
              <dd className="font-medium">{player.transferDestination}</dd>
            </div>
          )}{player.status === "nbaDraft" && player.transferDestination && (
            <div>
              <dt className="text-muted-foreground">Drafted By</dt>
              <dd className="font-medium">{player.transferDestination}</dd>
            </div>
          )}

          <div className="col-span-2">
            <dt className="text-muted-foreground">Previous Team</dt>
            <dd className="font-medium">{player.highSchoolOrPrevTeam}</dd>
          </div>  
        </dl>
      </CardContent>
      <CardFooter className="bg-muted px-4 py-3 border-t border-border">
        <div className="w-full">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Last Season</p>
            <Image 
              src={teamLogo.src} 
              alt={teamLogo.alt} 
              width={20} 
              height={20}
              aria-label={`Team logo: ${teamLogo.alt}`}
            />
          </div>
          <p className="text-sm font-medium flex flex-wrap gap-2">
            {!player.stats?.includes(',') ? (
              <span className="text-blue-600 font-semibold dark:text-blue-400">{player.stats}</span>
            ) : (
              player.stats?.split(', ').map((stat, index) => {
                const match = stat.match(/^([\d.]+)\s*(.*)$/); // Match number + stat
                return (
                  <span key={index}>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">{match?.[1]}</span>{' '}
                    <span className="dark:text-gray-300 text-gray-500">{match?.[2]}</span>
                  </span>
                );
              })
            )}
          </p>
        </div>
      </CardFooter>
    </Card>
  )
}

