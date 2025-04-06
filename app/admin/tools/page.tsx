"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { PlayerTable } from "@/components/admin/player-table"
import { toast } from "sonner"
import type { Player } from "@prisma/client"

export default function ToolsPage() {
  const [players, setPlayers] = useState<Player[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const res = await fetch("/api/players")
        if (!res.ok) throw new Error("Failed to fetch players")
        let data = await res.json()
        data = data.players;
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received')
        }
        setPlayers(data)
      } catch (error) {
        console.error("Error fetching players:", error)
        toast.error("Failed to fetch players")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPlayers()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  if (!players || players.length === 0) {
    return (
      <div className="flex items-center justify-center h-32">
        <div>No players found</div>
      </div>
    )
  }

  return <AdminTools players={players} />
}

interface AdminToolsProps {
  players: Player[]
}

function AdminTools({ players }: AdminToolsProps) {
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  console.log(players)

  const handleSelectPlayer = (playerId: string) => {
    setSelectedPlayers(prev =>
      prev.includes(playerId)
        ? prev.filter(id => id !== playerId)
        : [...prev, playerId]
    )
  }

  const handleSelectAll = () => {
    setSelectedPlayers(prev =>
      prev.length === players.length ? [] : players.map(p => p.id.toString())
    )
  }

  const handleIncrementYear = async () => {
    if (selectedPlayers.length === 0) {
      toast.error("Please select at least one player")
      return
    }

    setIsLoading(true)
    try {
      const yearMapping: { [key: string]: string } = {
        "Freshman": "Sophomore",
        "Sophomore": "Junior",
        "Junior": "Senior",
        "Senior": "Graduate",
        "RS-Junior": "RS-Senior",
        "RS-Senior": "Graduate",
        "Graduate": "Graduate"
      }

      await Promise.all(
        selectedPlayers.map(async (playerId) => {
          const player = players.find(p => p.id.toString() === playerId)
          if (!player) return

          const newYear = yearMapping[player.year] || player.year

          const response = await fetch(`/api/players/${playerId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...player, year: newYear })
          })

          if (!response.ok) throw new Error(`Failed to update player ${player.name}`)
        })
      )

      toast.success("Successfully updated player years")
      window.location.reload()
    } catch (error) {
      console.error(error)
      toast.error("Failed to update players")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin Tools</CardTitle>
          <CardDescription>
            Select players and perform bulk actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={handleSelectAll}
                className="w-[150px]"
              >
                {selectedPlayers.length === players.length
                  ? "Deselect All"
                  : "Select All"}
              </Button>
              <Button
                onClick={handleIncrementYear}
                disabled={isLoading || selectedPlayers.length === 0}
                className="w-[150px]"
              >
                Increment Year
              </Button>
            </div>

            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-2 text-left">
                      <Checkbox
                        checked={selectedPlayers.length === players.length}
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    <th className="p-2 text-left font-medium">Name</th>
                    <th className="p-2 text-left font-medium">Year</th>
                    <th className="p-2 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player) => (
                    <tr key={player.id} className="border-b">
                      <td className="p-2">
                        <Checkbox
                          checked={selectedPlayers.includes(player.id.toString())}
                          onCheckedChange={() => handleSelectPlayer(player.id.toString())}
                        />
                      </td>
                      <td className="p-2">{player.name}</td>
                      <td className="p-2">{player.year}</td>
                      <td className="p-2">{player.status}</td>
                    </tr>
                  ))
                }
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}