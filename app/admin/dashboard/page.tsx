import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlayerTable } from "@/components/admin/player-table"
import { DashboardStats } from "@/components/admin/dashboard-stats"
import { players } from "@/data/players"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#002E5D]">Admin Dashboard</h1>
        <p className="text-gray-500">Manage BYU Basketball roster and player statuses</p>
      </div>

      <DashboardStats players={players} />

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="all">All Players</TabsTrigger>
          <TabsTrigger value="committed">Committed</TabsTrigger>
          <TabsTrigger value="transfer">Transfer</TabsTrigger>
          <TabsTrigger value="undecided">Undecided</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Players</CardTitle>
              <CardDescription>View and manage all players in the roster</CardDescription>
            </CardHeader>
            <CardContent>
              <PlayerTable players={players} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="committed">
          <Card>
            <CardHeader>
              <CardTitle>Committed Players</CardTitle>
              <CardDescription>Players committed to BYU for the upcoming season</CardDescription>
            </CardHeader>
            <CardContent>
              <PlayerTable players={players.filter((p) => p.status === "committed")} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transfer">
          <Card>
            <CardHeader>
              <CardTitle>Transfer Portal</CardTitle>
              <CardDescription>Players in the transfer portal</CardDescription>
            </CardHeader>
            <CardContent>
              <PlayerTable players={players.filter((p) => p.status === "transfer")} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="undecided">
          <Card>
            <CardHeader>
              <CardTitle>Undecided Players</CardTitle>
              <CardDescription>Players with undecided status</CardDescription>
            </CardHeader>
            <CardContent>
              <PlayerTable players={players.filter((p) => p.status === "undecided")} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

