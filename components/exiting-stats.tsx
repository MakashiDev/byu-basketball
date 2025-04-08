import { CircleUser, UserCheck, UserX, HelpCircle } from "lucide-react";
import Image from "next/image";

interface ExitStatsProps {
  statusCounts: {
    graduated: number;
    transfer: number;
    nbaDraft: number;
  };
}

export function ExitStats({ statusCounts }: ExitStatsProps) {
  const totalPlayers =
    statusCounts.graduated + statusCounts.transfer + statusCounts.nbaDraft;
  const graduatedPercentage =
    Math.round((statusCounts.graduated / totalPlayers) * 100) || 0;
  const transferPercentage =
    Math.round((statusCounts.transfer / totalPlayers) * 100) || 0;
  const nbaDraftPercentage =
    Math.round((statusCounts.nbaDraft / totalPlayers) * 100) || 0;

  return (
    <div className="relative">
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-4 bg-card px-6 py-3 rounded-full shadow-md">
          <Image
            src="/images/byu-logo.png"
            alt="BYU Logo"
            width={40}
            height={40}
          />
          <h2 className="text-xl font-bold text-[#002E5D] dark:text-blue-400">
            2025-26 Roster Breakdown
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card rounded-lg shadow-md p-6 flex flex-col items-center text-center">
          <CircleUser className="h-10 w-10 text-[#002E5D] dark:text-blue-400 mb-2" />
          <h3 className="text-2xl font-bold text-[#002E5D] dark:text-blue-400">
            {totalPlayers}
          </h3>
          <p className="text-muted-foreground">Total Players</p>
        </div>

        <div className="bg-card rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-red-600 " />
              <h3 className="font-medium">NBA Draft</h3>
            </div>
            <span className="text-lg font-bold text-red-600 ">
              {statusCounts.nbaDraft}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2.5">
            <div
              className="bg-red-600 h-2.5 rounded-full"
              style={{ width: `${nbaDraftPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {nbaDraftPercentage}% of roster
          </p>
        </div>

        <div className="bg-card rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-blue-600" />
              <h3 className="font-medium">Graduated</h3>
            </div>
            <span className="text-lg font-bold text-blue-600">
              {statusCounts.graduated}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${graduatedPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {graduatedPercentage}% of roster
          </p>
        </div>

        


      <div className="bg-card rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-amber-600 " />
            <h3 className="font-medium">Transfer Portal</h3>
          </div>
          <span className="text-lg font-bold text-amber-600 ">
            {statusCounts.transfer}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2.5">
          <div
            className="bg-amber-600  h-2.5 rounded-full"
            style={{ width: `${transferPercentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {transferPercentage}% of roster
        </p>
      </div>
    </div>
  </div>
  );
}
