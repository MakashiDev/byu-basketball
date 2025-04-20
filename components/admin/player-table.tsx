"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { Player } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Edit, MoreHorizontal, Trash2 } from "lucide-react"

interface PlayerTableProps {
  players: Player[]
}

export function PlayerTable({ players }: PlayerTableProps) {
  const router = useRouter()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [playerToDelete, setPlayerToDelete] = useState<Player | null>(null)

  const statusColors = {
    committed: "bg-green-600 hover:bg-green-600",
    transfer: "bg-amber-600 hover:bg-amber-600",
    likely: "bg-purple-600 hover:bg-purple-600",
    transferred: "bg-amber-600 hover:bg-amber-600",
    unconfirmed: "bg-gray-600 hover:bg-gray-600",
    returning: "bg-purple-600 hover:bg-purple-600",
    graduated: "bg-blue-600 hover:bg-blue-600",
    nbaDraft: "bg-red-600 hover:bg-red-600",
  }

  const statusLabels = {
    committed: "Committed",
    transfer: "Transfer Portal",
    likely: "Likely",
    transferred: "Transferred",
    unconfirmed: "Unconfirmed",
    returning: "Returning",
    graduated: "Graduated",
    nbaDraft: "NBA Draft",
  }

  function handleDeleteClick(player: Player) {
    setPlayerToDelete(player)
    setIsDeleteDialogOpen(true)
  }

  async function handleDeleteConfirm() {
    if (!playerToDelete) return

    try {
      const response = await fetch(`/api/players/${playerToDelete.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        // In a real app, you would update the state or refetch the data
        router.refresh()
      } else {
        console.error("Failed to delete player")
      }
    } catch (error) {
      console.error("Error deleting player:", error)
    } finally {
      setIsDeleteDialogOpen(false)
      setPlayerToDelete(null)
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  No players found
                </TableCell>
              </TableRow>
            ) : (
              players.map((player) => (
                <TableRow key={player.id}>
                  <TableCell className="font-medium">{player.jerseyNumber}</TableCell>
                  <TableCell>
                    <div className="font-medium">{player.name}</div>
                    <div className="text-sm text-gray-500">{player.hometown}</div>
                  </TableCell>
                  <TableCell>{player.position || "N/A"}</TableCell>
                  <TableCell>{
                      player.year || "TBD"
                    }</TableCell>
                  <TableCell>
                    <Badge className={statusColors[player.status]}>{statusLabels[player.status]}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/players/${player.id}`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          onClick={() => handleDeleteClick(player)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {playerToDelete?.name} from the roster. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

