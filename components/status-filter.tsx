"use client"

import { cn } from "@/lib/utils"

interface StatusFilterProps {
  status: "all" | "committed" | "transfer" | "undecided"
  count: number
  selected: boolean
  onClick: () => void
}

export function StatusFilter({ status, count, selected, onClick }: StatusFilterProps) {
  const statusColors = {
    all: "bg-[#002E5D] text-white hover:bg-[#002E5D]/90",
    committed: "bg-green-600 text-white hover:bg-green-700",
    transfer: "bg-amber-600 text-white hover:bg-amber-700",
    undecided: "bg-gray-600 text-white hover:bg-gray-700",
  }

  const statusLabels = {
    all: "All Players",
    committed: "Committed",
    transfer: "Transfer Portal",
    undecided: "Undecided",
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors shadow-sm",
        selected ? statusColors[status] : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50",
      )}
    >
      {statusLabels[status]}
      <span
        className={cn(
          "inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold",
          selected ? "bg-white/20 text-white" : "bg-gray-100 text-gray-700",
        )}
      >
        {count}
      </span>
    </button>
  )
}

