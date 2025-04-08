"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Player } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"

interface PlayerFormProps {
  player?: Player
}

export function PlayerForm({ player }: PlayerFormProps) {
  const router = useRouter()
  const isEditing = !!player

  const [formData, setFormData] = useState<Partial<Player>>(
    player || {
      status: "undecided",
    },
  )

  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSelectChange(name: string, value: string) {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    const numberValue = value === "" ? undefined : Number.parseInt(value)
    setFormData((prev) => ({ ...prev, [name]: numberValue }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const url = isEditing ? `/api/players/${player.id}` : "/api/players"

      const method = isEditing ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/admin/dashboard")
        router.refresh()
      } else {
        const data = await response.json()
        setError(data.error || "Failed to save player")
      }
    } catch (err) {
      setError("An error occurred while saving")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Player" : "Add New Player"}</CardTitle>
          <CardDescription>
            {isEditing ? "Update player information and status" : "Enter details to add a new player to the roster"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jerseyNumber">Jersey Number</Label>
              <Input
                id="jerseyNumber"
                name="jerseyNumber"
                type="number"
                value={formData.jerseyNumber || ""}
                onChange={handleNumberChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={formData.name || ""} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input id="position" name="position" value={formData.position || ""} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Height</Label>
              <Input id="height" name="height" value={formData.height || ""} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Select
                name="year"
                value={formData.year || ""}
                onValueChange={(value) => handleSelectChange("year", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Freshman">Freshman</SelectItem>
                  <SelectItem value="Sophomore">Sophomore</SelectItem>
                  <SelectItem value="Junior">Junior</SelectItem>
                  <SelectItem value="Senior">Senior</SelectItem>
                  <SelectItem value="RS-Junior">RS-Freshman</SelectItem>
                  <SelectItem value="RS-Junior">RS-Junior</SelectItem>
                  <SelectItem value="RS-Junior">RS-Sophomore</SelectItem>
                  <SelectItem value="RS-Senior">RS-Senior</SelectItem>
                  <SelectItem value="Graduate">Graduate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                name="status"
                value={formData.status || "unconfirmed"}
                onValueChange={(value) => handleSelectChange("status", value as Player["status"])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="committed">Committed</SelectItem>
                  <SelectItem value="transfer">Transfer Portal</SelectItem>
                  <SelectItem value="unconfirmed">Unconfirmed</SelectItem>
                  <SelectItem value="graduated">Graduated</SelectItem>
                  <SelectItem value="transferred">Transferred</SelectItem>
                  <SelectItem value="nbaDraft">NBA Draft</SelectItem>
                  <SelectItem value="returning">Likely Returning</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="formerPlayer"
                name="formerPlayer"
                checked={!!formData.formerPlayer}
                onChange={(e) => setFormData((prev) => ({ ...prev, formerPlayer: e.target.checked }))}
                className="h-4 w-4 rounded border-gray-300 text-[#002E5D] focus:ring-[#002E5D]"
              />
              <Label htmlFor="formerPlayer">Former Player (2024-25)</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hometown">Hometown</Label>
              <Input id="hometown" name="hometown" value={formData.hometown || ""} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="highSchoolOrPrevTeam">High School/Previous Team</Label>
              <Input
                id="highSchoolOrPrevTeam"
                name="highSchoolOrPrevTeam"
                value={formData.highSchoolOrPrevTeam || ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stats">Stats</Label>
            <Textarea
              id="stats"
              name="stats"
              value={formData.stats || ""}
              onChange={handleChange}
              placeholder="e.g., 10.5 PPG, 6.2 RPG, 0.8 APG"
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              value={formData.image || ""}
              onChange={handleChange}
              placeholder="Leave blank to use jersey number placeholder"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? "Update Player" : "Add Player"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

