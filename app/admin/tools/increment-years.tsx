"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { incrementPlayerYear, shouldGraduate } from "@/lib/player-utils"

export default function IncrementYearsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [stats, setStats] = useState<{
    updated: number
    graduated: number
    unchanged: number
  }>({ updated: 0, graduated: 0, unchanged: 0 })

  async function handleIncrementYears() {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Fetch all players
      const playersResponse = await fetch("/api/players")
      const playersData = await playersResponse.json()
      const players = playersData.players

      let updated = 0
      let graduated = 0
      let unchanged = 0

      // Process each player
      for (const player of players) {
        // Skip players who are already marked as former players
        if (player.formerPlayer) {
          unchanged++
          continue
        }

        // Check if player should graduate
        if (shouldGraduate(player.year)) {
          // Mark as graduated and former player
          await fetch(`/api/players/${player.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: "graduated",
              formerPlayer: true
            }),
          })
          graduated++
        } else {
          // Increment the player's year
          const nextYear = incrementPlayerYear(player.year)
          
          if (nextYear) {
            await fetch(`/api/players/${player.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                year: nextYear
              }),
            })
            updated++
          } else {
            // This shouldn't happen with our current logic, but just in case
            unchanged++
          }
        }
      }

      setStats({ updated, graduated, unchanged })
      setSuccess(true)
    } catch (err) {
      console.error("Error incrementing years:", err)
      setError("An error occurred while updating player years")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#002E5D]">Increment Player Years</h1>
        <p className="text-gray-500">Update all player classifications for the next season</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Year Progression Tool</CardTitle>
          <CardDescription>
            This tool will automatically increment each player's year classification (e.g., Freshman → Sophomore).
            Players who are Seniors, RS-Seniors, or Graduate students will be marked as graduated and moved to the
            Former Players page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
              <AlertDescription>
                <div className="font-medium">Player years updated successfully!</div>
                <ul className="mt-2 list-disc list-inside text-sm">
                  <li>{stats.updated} players advanced to next year</li>
                  <li>{stats.graduated} players graduated and moved to Former Players</li>
                  <li>{stats.unchanged} players unchanged</li>
                </ul>
              </AlertDescription>
            </Alert>
          )}

          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-4">
            <h3 className="text-amber-800 font-medium mb-2">Warning</h3>
            <p className="text-amber-700 text-sm">
              This action will update all player years in the database. Seniors, RS-Seniors, and Graduate students will
              be marked as graduated and moved to the Former Players page. This action cannot be undone.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleIncrementYears} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update Player Years
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}