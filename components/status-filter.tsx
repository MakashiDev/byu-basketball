"use client"

import { cn } from "@/lib/utils"

interface StatusFilterProps {
  status: "all" | "committed" | "transfer" | "unconfirmed" 
  count: number
  selected: boolean
  onClick: () => void
}

export function StatusFilter({ status, count, selected, onClick }: StatusFilterProps) {
  const statusColors = {
    all: "bg-[#002E5D] text-white hover:bg-[#002E5D]/90",
    committed: "bg-green-600 text-white hover:bg-green-700",
    transfer: "bg-amber-600 text-white hover:bg-amber-700",
    unconfirmed: "bg-gray-600 text-white hover:bg-gray-700",
    likely_returning: "bg-blue-600 text-white hover:bg-blue-700",
  }

  const statusLabels = {
    all: "All Players",
    committed: "Committed",
    transfer: "Transfer Portal",
    unconfirmed: "Unconfirmed",
    likely_returning: "Likely Returning",
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors shadow-sm",
        selected ? statusColors[status] : "bg-card text-card-foreground border border-border hover:bg-muted",
      )}
    >
      {statusLabels[status]}
      <span
        className={cn(
          "inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold",
          selected ? "bg-white/20 text-white" : "bg-muted text-muted-foreground",
        )}
      >
        {count}
      </span>
    </button>
  )
}

