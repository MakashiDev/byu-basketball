"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { PlayerCard } from "@/components/player-card";
import { TeamStats } from "@/components/team-stats";
import { ExitStats } from "./exiting-stats";
import type { Player } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
interface PlayerStatusDashboardProps {
  players: Player[];
}

export function PlayerStatusDashboard({ players }: PlayerStatusDashboardProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    const handleScroll = () => setIsScrolled(window.scrollY > 100); 

    // Set initial mobile state
    handleResize();

    // Add event listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Filter players by status categories
  // Roster categories
  const currentPlayers = players.filter(
    (p) => !["graduated", "transfer", "nbaDraft"].includes(p.status)
  );
  const exitingPlayers = players.filter(
    (p) => ["graduated", "transfer", "nbaDraft"].includes(p.status)
  )
  
  const committedPlayers = players.filter((p) => ["committed", "transfer", "projected"].includes(p.status))
  const returningPlayers = players.filter((p) => p.status === "returning");
  const unconfirmedPlayers = players.filter((p) => p.status === "unconfirmed");
  
  // Exiting players categories
  const graduatedPlayers = players.filter((p) => p.status === "graduated");
  const nbaDraftPlayers = players.filter((p) => p.status === "nbaDraft");
  const transferredPlayers = players.filter((p) => p.status === "transfer");

  // No longer need filteredPlayers since we're using tabs for filtering

  const statusCounts = {
    committed: committedPlayers.length,
    transfer: transferredPlayers.length,
    undecided: unconfirmedPlayers.length,
    graduated: graduatedPlayers.length,
    nbaDraft: nbaDraftPlayers.length,
    returning: returningPlayers.length,
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#002E5D]/80 dark:from-[#001a33]/80 to-[#002E5D]/95 dark:to-[#001a33]/95 z-10"></div>
        <Image
          src="/images/byu-basketball-court.jpg"
          alt="BYU Basketball Court"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-4">
          <div className="flex items-center gap-8 mb-8">
            <Image
              src="/images/byu-logo.png"
              alt="BYU Logo"
              width={150}
              height={150}
              className="drop-shadow-lg"
            />
            <div className="h-20 w-0.5 bg-white/30"></div>
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Big_12_logo_in_BYU_colors.svg/2560px-Big_12_logo_in_BYU_colors.svg.png"
              alt="Big 12 Logo"
              width={130}
              height={80}
              className="drop-shadow-lg"
            />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 drop-shadow-md">
            Unofficial BYU Basketball Roster
          </h1>
          <p className="text-xl md:text-2xl text-center max-w-2xl text-white/90 drop-shadow">
            2025-26 Season Outlook
          </p>
          <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
            <ChevronDown className="h-8 w-8 text-white/70" />
          </div>
        </div>
      </div>
      <Tabs defaultValue="roster">
      {/* Sticky Header */}
      <div
        className={`sticky top-0 z-30 w-full bg-[#002E5D] dark:bg-[#001a33] text-white transition-all duration-300 ${
          isScrolled ? "py-2 shadow-lg" : "py-4"
        }`}
      >
        <div className="container mx-0 px-2 md:mx-auto md:px-4 flex items-center justify-between">
          <div className="flex items-center gap-3 w-1/3">
            <Image
              src="/images/byu-logo.png"
              alt="BYU Logo"
              width={isMobile ? 40 : isScrolled ? 40 : 50}
              height={isMobile ? 40 : isScrolled ? 40 : 50}
              className="transition-all duration-300"
            />
            <h2
              className={`font-bold transition-all duration-300 ${
                isScrolled ? "text-xs" : "text-md"
              }`}
            >
              Cougar Basketball
            </h2>
          </div>
            <div className="w-1/3">
              <TabsList className="w-full">
                <TabsTrigger 
                className="text-white w-1/2"
                value="roster">Roster</TabsTrigger>
                <TabsTrigger 
                className="text-white w-1/2"
                value="exiting">Exiting</TabsTrigger>
              </TabsList>
            </div>
          <div className="flex items-center gap-3 w-1/3 justify-end">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Big_12_logo_in_BYU_colors.svg/2560px-Big_12_logo_in_BYU_colors.svg.png"
              alt="Big 12 Logo"
              width={isMobile ? 60 : isScrolled ? 60 : 70}
              height={isMobile ? 30 : isScrolled ? 30 : 35}
              className="transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <TabsContent value="roster">
        {/* Team Stats Section */}
        <div className="dark:bg-[#002E5D]/10 bg-muted py-8 border-b border-border max-sm:hidden">
          <div className="container mx-auto px-4">
            <TeamStats statusCounts={statusCounts} />
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl md:text-3xl font-bold text-[#002E5D] dark:text-blue-400">
                2025-26 Roster Outlook
              </h2>
              <p className="text-muted-foreground">
                Players expected to be on next season's roster
              </p>
            </div>
          </div>

          {/* Roster Sub-tabs */}
          <Tabs defaultValue="all" className="mt-6">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All ({currentPlayers.length})</TabsTrigger>
              <TabsTrigger value="returning">Returning ({returningPlayers.length})</TabsTrigger>
              <TabsTrigger value="committed">Committed ({committedPlayers.length})</TabsTrigger>
              <TabsTrigger value="unconfirmed">Unconfirmed ({unconfirmedPlayers.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentPlayers.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="committed">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {committedPlayers.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="returning">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {returningPlayers.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="unconfirmed">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {unconfirmedPlayers.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </TabsContent>

      <TabsContent value="exiting">
      <div className="dark:bg-[#002E5D]/10 bg-muted py-8 border-b border-border max-sm:hidden">
          <div className="container mx-auto px-4">
            <ExitStats statusCounts={statusCounts} />
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-2 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#002E5D] dark:text-blue-400">
              Exiting Players
            </h2>
            <p className="text-muted-foreground">
              Players who are leaving or have left the program
            </p>
          </div>



          {/* Exiting Sub-tabs */}
          <Tabs defaultValue="all" className="mt-6">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All ({exitingPlayers.length})</TabsTrigger>
              <TabsTrigger value="nbaDraft">NBA Draft ({nbaDraftPlayers.length})</TabsTrigger>
              <TabsTrigger value="graduated">Graduated ({graduatedPlayers.length})</TabsTrigger>
              <TabsTrigger value="transferred">Transferring ({transferredPlayers.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {exitingPlayers.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            </TabsContent>


            <TabsContent value="graduated">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {graduatedPlayers.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="nbaDraft">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {nbaDraftPlayers.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="transferred">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {transferredPlayers.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </TabsContent>
      </Tabs>
      {/* Cosmo Feature Section */}
      <div className="bg-[#002E5D]/5 dark:bg-[#002E5D]/10 py-12 my-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3 relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/cosmo.png"
                alt="Cosmo the Cougar"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold text-[#002E5D] dark:text-blue-400 mb-4">
                BYU Basketball: Big 12 Ready
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                The Cougars are making their mark in the Big 12 Conference. With
                a strong roster of talented players, BYU basketball is poised
                for success in one of college basketball's most competitive
                conferences.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                As the 2025-26 season approaches, fans are eager to see which
                players will commit to the program and which might explore
                opportunities elsewhere. Stay updated with our roster tracker to
                follow all the latest player status changes.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <Image
                  src="/images/byu-logo.png"
                  alt="BYU Logo"
                  width={60}
                  height={60}
                />
                <div className="h-12 w-0.5 bg-gray-300 dark:bg-gray-700"></div>
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Big_12_logo_in_BYU_colors.svg/2560px-Big_12_logo_in_BYU_colors.svg.png"
                  alt="Big 12 Logo"
                  width={80}
                  height={40}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#002E5D] dark:bg-[#001a33] text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <Image
                src="/images/byu-logo.png"
                alt="BYU Logo"
                width={60}
                height={60}
              />
              <div>
                <h3 className="font-bold text-xl">BYU Cougars</h3>
                <p className="text-white/70">
                  Disclaimer, this is a fan site and is not affiliated with BYU
                  or the Big 12 Conference
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Big_12_logo_in_BYU_colors.svg/2560px-Big_12_logo_in_BYU_colors.svg.png"
                alt="Big 12 Logo"
                width={80}
                height={40}
              />
              <div className="h-10 w-0.5 bg-white/20"></div>
              <p className="text-white/70">
                © {new Date().getFullYear()} Christian Furr
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
