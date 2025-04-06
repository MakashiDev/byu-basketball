"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlayerTable } from "@/components/admin/player-table"
import type { Player } from "@prisma/client"
import { GraduationCap, ExternalLink, Award } from "lucide-react"

interface FormerPlayersDashboardProps {
  formerPlayers: Player[]
}

export function FormerPlayersDashboard({ formerPlayers }: FormerPlayersDashboardProps) {
  const graduatedPlayers = formerPlayers.filter((p) => p.status === "graduated")
  const transferredPlayers = formerPlayers.filter((p) => p.status === "transferred")
  const nbaDraftPlayers = formerPlayers.filter((p) => p.status === "nba_draft")

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Graduated</CardTitle>
            <GraduationCap className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{graduatedPlayers.length}</div>
            <p className="text-xs text-muted-foreground">Players who graduated</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transferred</CardTitle>
            <ExternalLink className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transferredPlayers.length}</div>
            <p className="text-xs text-muted-foreground">Players who transferred to other schools</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">NBA Draft</CardTitle>
            <Award className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nbaDraftPlayers.length}</div>
            <p className="text-xs text-muted-foreground">Players who entered the NBA draft</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="all">All Former Players</TabsTrigger>
          <TabsTrigger value="graduated">Graduated</TabsTrigger>
          <TabsTrigger value="transferred">Transferred</TabsTrigger>
          <TabsTrigger value="nba_draft">NBA Draft</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Former Players</CardTitle>
              <CardDescription>View all players who are no longer on the roster</CardDescription>
            </CardHeader>
            <CardContent>
              <PlayerTable players={formerPlayers} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="graduated">
          <Card>
            <CardHeader>
              <CardTitle>Graduated Players</CardTitle>
              <CardDescription>Players who have graduated</CardDescription>
            </CardHeader>
            <CardContent>
              <PlayerTable players={graduatedPlayers} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transferred">
          <Card>
            <CardHeader>
              <CardTitle>Transferred Players</CardTitle>
              <CardDescription>Players who have transferred to other schools</CardDescription>
            </CardHeader>
            <CardContent>
              <PlayerTable players={transferredPlayers} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="nba_draft">
          <Card>
            <CardHeader>
              <CardTitle>NBA Draft Players</CardTitle>
              <CardDescription>Players who have entered the NBA draft</CardDescription>
            </CardHeader>
            <CardContent>
              <PlayerTable players={nbaDraftPlayers} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}