"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { PlayerCard } from "@/components/player-card"
import { StatusFilter } from "@/components/status-filter"
import { players } from "@/data/players"
import { TeamStats } from "@/components/team-stats"

type PlayerStatus = "committed" | "transfer" | "undecided"

export function PlayerStatusDashboard() {
  const [selectedStatus, setSelectedStatus] = useState<PlayerStatus | "all">("all")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const filteredPlayers =
    selectedStatus === "all" ? players : players.filter((player) => player.status === selectedStatus)

  const statusCounts = {
    committed: players.filter((p) => p.status === "committed").length,
    transfer: players.filter((p) => p.status === "transfer").length,
    undecided: players.filter((p) => p.status === "undecided").length,
  }

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#002E5D]/80 to-[#002E5D]/95 z-10"></div>
        <Image
          src="/images/byu-basketball-court.jpg"
          alt="BYU Basketball Court"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-4">
          <div className="flex items-center gap-8 mb-8">
            <Image src="/images/byu-logo.png" alt="BYU Logo" width={150} height={150} className="drop-shadow-lg" />
            <div className="h-20 w-0.5 bg-white/30"></div>
            <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Big_12_logo_in_BYU_colors.svg/2560px-Big_12_logo_in_BYU_colors.svg.png" alt="Big 12 Logo" width={130} height={80} className="drop-shadow-lg" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 drop-shadow-md">
            BYU Basketball Roster
          </h1>
          <p className="text-xl md:text-2xl text-center max-w-2xl text-white/90 drop-shadow">2025-26 Season Outlook</p>
          <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
            <ChevronDown className="h-8 w-8 text-white/70" />
          </div>
        </div>
      </div>

      {/* Sticky Header */}
      <div
        className={`sticky top-0 z-30 w-full bg-[#002E5D] text-white transition-all duration-300 ${
          isScrolled ? "py-2 shadow-lg" : "py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image
              src="/images/byu-logo.png"
              alt="BYU Logo"
              width={isScrolled ? 40 : 50}
              height={isScrolled ? 40 : 50}
              className="transition-all duration-300"
            />
            <h2 className={`font-bold transition-all duration-300 ${isScrolled ? "text-lg" : "text-xl"}`}>
              Cougar Basketball
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Big_12_logo_in_BYU_colors.svg/2560px-Big_12_logo_in_BYU_colors.svg.png"
              alt="Big 12 Logo"
              width={isScrolled ? 60 : 70}
              height={isScrolled ? 30 : 35}
              className="transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Team Stats Section */}
      <div className="bg-gray-100 py-8 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <TeamStats statusCounts={statusCounts} />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl md:text-3xl font-bold text-[#002E5D]">Player Status Tracker</h2>
            <p className="text-gray-600">Track which players are committed, in the transfer portal, or undecided</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block w-20 h-20 relative overflow-hidden">
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusFilter
                status="all"
                count={players.length}
                selected={selectedStatus === "all"}
                onClick={() => setSelectedStatus("all")}
              />
              <StatusFilter
                status="committed"
                count={statusCounts.committed}
                selected={selectedStatus === "committed"}
                onClick={() => setSelectedStatus("committed")}
              />
              <StatusFilter
                status="transfer"
                count={statusCounts.transfer}
                selected={selectedStatus === "transfer"}
                onClick={() => setSelectedStatus("transfer")}
              />
              <StatusFilter
                status="undecided"
                count={statusCounts.undecided}
                selected={selectedStatus === "undecided"}
                onClick={() => setSelectedStatus("undecided")}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </div>

      {/* Cosmo Feature Section */}
      <div className="bg-[#002E5D]/5 py-12 my-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3 relative h-[300px] md:h-[400px]">
              <Image src="/images/cosmo.png" alt="Cosmo the Cougar" fill className="object-contain object-center" />
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold text-[#002E5D] mb-4">BYU Basketball: Big 12 Ready</h2>
              <p className="text-lg text-gray-700 mb-4">
                The Cougars are making their mark in the Big 12 Conference. With a strong roster of talented players,
                BYU basketball is poised for success in one of college basketball's most competitive conferences.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                As the 2025-26 season approaches, fans are eager to see which players will commit to the program and
                which might explore opportunities elsewhere. Stay updated with our roster tracker to follow all the
                latest player status changes.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <Image src="/images/byu-logo.png" alt="BYU Logo" width={60} height={60} />
                <div className="h-12 w-0.5 bg-gray-300"></div>
                <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Big_12_logo_in_BYU_colors.svg/2560px-Big_12_logo_in_BYU_colors.svg.png" alt="Big 12 Logo" width={80} height={40} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#002E5D] text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <Image src="/images/byu-logo.png" alt="BYU Logo" width={60} height={60} />
              <div>
                <h3 className="font-bold text-xl">BYU Cougars</h3>
                <p className="text-white/70">Brigham Young University Athletics</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Big_12_logo_in_BYU_colors.svg/2560px-Big_12_logo_in_BYU_colors.svg.png" alt="Big 12 Logo" width={80} height={40} />
              <div className="h-10 w-0.5 bg-white/20"></div>
              <p className="text-white/70">© {new Date().getFullYear()} Christian Furr</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

