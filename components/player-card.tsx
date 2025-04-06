import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Player } from "@/data/players"

interface PlayerCardProps {
  player: Player
}

export function PlayerCard({ player }: PlayerCardProps) {
  const statusColors = {
    committed: "bg-green-600 hover:bg-green-600",
    transfer: "bg-amber-600 hover:bg-amber-600",
    undecided: "bg-gray-600 hover:bg-gray-600",
  }

  const statusLabels = {
    committed: "Committed",
    transfer: "Transfer Portal",
    undecided: "Undecided",
  }

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 rounded-lg shadow-md">
      <div className="relative h-72 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#002E5D] to-transparent z-10 opacity-70"></div>
        <div className="absolute top-0 right-0 z-20 p-2">
          <Badge className={`${statusColors[player.status]} text-white font-medium px-3 py-1`}>
            {statusLabels[player.status]}
          </Badge>
        </div>
        <div className="absolute top-0 left-0 z-20 p-2">
          <div className="bg-[#002E5D] text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
            {player.jerseyNumber}
          </div>
        </div>
        <Image
          src={player.image || `/placeholder.svg?height=288&width=288&text=${player.jerseyNumber}`}
          alt={player.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
          <h3 className="font-bold text-xl text-white drop-shadow-md">{player.name}</h3>
          <p className="text-white/90 text-sm">{player.position}</p>
        </div>
      </div>
      <CardContent className="p-4 bg-white">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-500">Year</p>
            <p className="font-medium">{player.year}</p>
          </div>
          <div>
            <p className="text-gray-500">Height</p>
            <p className="font-medium">{player.height}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-500">Hometown</p>
            <p className="font-medium">{player.hometown}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-500">Previous Team</p>
            <p className="font-medium">{player.highSchoolOrPrevTeam}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 px-4 py-3 border-t border-gray-100">
        <div className="w-full">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">Season Stats</p>
            <Image src="/images/byu-logo.png" alt="BYU Logo" width={20} height={20} className="opacity-50" />
          </div>
          <p className="text-sm font-medium text-[#002E5D]">{player.stats}</p>
        </div>
      </CardFooter>
    </Card>
  )
}

