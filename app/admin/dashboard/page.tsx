import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlayerTable } from "@/components/admin/player-table"
import { DashboardStats } from "@/components/admin/dashboard-stats"
import { prisma } from "@/lib/prisma"
export const revalidate = 0
export const dynamic = "force-dynamic"

// Fetch function for active players
async function fetchActivePlayers() {
  return await prisma.player.findMany({
    where: {
      formerPlayer: false,
      status: {
        not: "graduated"
      }
    }
  })
}

// Fetch function for graduated players
async function fetchGraduatedPlayers() {
  return await prisma.player.findMany({
    where: {
      status: "graduated"
    }
  })
}

// Main page component
export default async function DashboardPage() {
  // Fetch data sequentially
  const players = await fetchActivePlayers() // Fetch active players
  const graduates = await fetchGraduatedPlayers() // Fetch graduated player

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#002E5D] 
        dark:text-[#0817b9]
        ">Admin Dashboard</h1>
        <p className="text-gray-500">Manage BYU Basketball roster and player statuses</p>
      </div>

      <DashboardStats players={players} />

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-7 w-full max-w-md">
          <TabsTrigger value="all">All Players</TabsTrigger>
          <TabsTrigger value="returning">Returning</TabsTrigger>
          <TabsTrigger value="committed">Committed</TabsTrigger>
          <TabsTrigger value="undecided">Undecided</TabsTrigger>
          <TabsTrigger value="nbaDraft">NBA Draft</TabsTrigger>
          <TabsTrigger value="graduated">Graduated</TabsTrigger>
          <TabsTrigger value="transfer">Transfer</TabsTrigger>
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
              <PlayerTable players={players.filter((p) => ["committed", "projected"].includes(p.status))} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="returning">
          <Card>
            <CardHeader>
              <CardTitle>Returning Players</CardTitle>
              <CardDescription>Players who are expected to return to BYU for the upcoming season</CardDescription>
            </CardHeader>
            <CardContent>
              <PlayerTable players={players.filter((p) => ["likely", "returning"].includes(p.status))} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transfer">
          <Card>
            <CardHeader>
              <CardTitle>Transfering</CardTitle>
              <CardDescription>Players who are transfering</CardDescription>
            </CardHeader>
            <CardContent>
              <PlayerTable players={players.filter((p) => ["transfer", "transferred"].includes(p.status))} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="undecided">
          <Card>
            <CardHeader>
              <CardTitle>Unconfirmed Players</CardTitle>
              <CardDescription>Players with unconfirmed status</CardDescription>
            </CardHeader>
            <CardContent>
              <PlayerTable players={players.filter((p) => p.status === "unconfirmed")} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="nbaDraft">
          <Card>
            <CardHeader>
              <CardTitle>NBA Draft</CardTitle>
              <CardDescription>Players who intend to declare for the NBA Draft</CardDescription>
            </CardHeader>
            <CardContent>
              <PlayerTable players={players.filter((p) => ["nbaDraft"].includes(p.status))} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="graduated">
          <Card>
            <CardHeader>
              <CardTitle>Graduated Players</CardTitle>
              <CardDescription>Players who have graduated from BYU</CardDescription>
            </CardHeader>
            <CardContent>
              <PlayerTable players={graduates} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}