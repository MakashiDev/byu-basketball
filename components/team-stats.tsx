import { CircleUser, UserCheck, UserX, HelpCircle } from "lucide-react"
import Image from "next/image"

interface TeamStatsProps {
  statusCounts: {
    committed: number
    transfer: number
    undecided: number
  }
}

export function TeamStats({ statusCounts }: TeamStatsProps) {
  const totalPlayers = statusCounts.committed + statusCounts.transfer + statusCounts.undecided

  const committedPercentage = Math.round((statusCounts.committed / totalPlayers) * 100) || 0
  const transferPercentage = Math.round((statusCounts.transfer / totalPlayers) * 100) || 0
  const undecidedPercentage = Math.round((statusCounts.undecided / totalPlayers) * 100) || 0

  return (
    <div className="relative">
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-full shadow-md">
          <Image src="/images/byu-logo.png" alt="BYU Logo" width={40} height={40} />
          <h2 className="text-xl font-bold text-[#002E5D]">2024-25 Roster Breakdown</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
          <CircleUser className="h-10 w-10 text-[#002E5D] mb-2" />
          <h3 className="text-2xl font-bold text-[#002E5D]">{totalPlayers}</h3>
          <p className="text-gray-600">Total Players</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-green-600" />
              <h3 className="font-medium">Committed</h3>
            </div>
            <span className="text-lg font-bold text-green-600">{statusCounts.committed}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${committedPercentage}%` }}></div>
          </div>
          <p className="text-sm text-gray-500 mt-1">{committedPercentage}% of roster</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <UserX className="h-5 w-5 text-amber-600" />
              <h3 className="font-medium">Transfer Portal</h3>
            </div>
            <span className="text-lg font-bold text-amber-600">{statusCounts.transfer}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: `${transferPercentage}%` }}></div>
          </div>
          <p className="text-sm text-gray-500 mt-1">{transferPercentage}% of roster</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-gray-600" />
              <h3 className="font-medium">Undecided</h3>
            </div>
            <span className="text-lg font-bold text-gray-600">{statusCounts.undecided}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-gray-600 h-2.5 rounded-full" style={{ width: `${undecidedPercentage}%` }}></div>
          </div>
          <p className="text-sm text-gray-500 mt-1">{undecidedPercentage}% of roster</p>
        </div>
      </div>

      <div className="absolute -top-4 right-0 hidden lg:block">
        <Image src="/images/big12-logo.png" alt="Big 12 Logo" width={100} height={50} className="opacity-20" />
      </div>
    </div>
  )
}

