import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Player } from "@/data/players"
import { Users, UserCheck, UserX, HelpCircle } from "lucide-react"

interface DashboardStatsProps {
  players: Player[]
}

export function DashboardStats({ players }: DashboardStatsProps) {
  const totalPlayers = players.length
  const committedPlayers = players.filter((p) => p.status === "committed").length
  const transferPlayers = players.filter((p) => p.status === "transfer").length
  const undecidedPlayers = players.filter((p) => p.status === "undecided").length

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Players</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPlayers}</div>
          <p className="text-xs text-muted-foreground">Players in the roster</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Committed</CardTitle>
          <UserCheck className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{committedPlayers}</div>
          <p className="text-xs text-muted-foreground">
            {((committedPlayers / totalPlayers) * 100).toFixed(1)}% of roster
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Transfer Portal</CardTitle>
          <UserX className="h-4 w-4 text-amber-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{transferPlayers}</div>
          <p className="text-xs text-muted-foreground">
            {((transferPlayers / totalPlayers) * 100).toFixed(1)}% of roster
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Undecided</CardTitle>
          <HelpCircle className="h-4 w-4 text-gray-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{undecidedPlayers}</div>
          <p className="text-xs text-muted-foreground">
            {((undecidedPlayers / totalPlayers) * 100).toFixed(1)}% of roster
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

