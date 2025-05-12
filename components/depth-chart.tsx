import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { DepthChart } from "@prisma/client";
import Image from "next/image";

interface depthChartProps {
  depthChart?: DepthChart[] | null;
}

export default function Depth_Chart({ depthChart }: depthChartProps) {

  const PG = depthChart?.filter(position => position.position === "PG")[0]
  console.log(PG)
  const SG = depthChart?.filter(position => position.position === "SG")[0]
  const SF = depthChart?.filter(position => position.position === "SF")[0]
  const PF = depthChart?.filter(position => position.position === "PF")[0]
  const C = depthChart?.filter(position => position.position === "C")[0]

  return (
    <div className="mt-12">
      <h1 className="font-bold mb-6 text-white text-3xl"> Projected Depth Chart</h1>
      <Table className="bg-gray-900 rounded-xl">
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 md:w-16"></TableHead>
            <TableHead>Starter</TableHead>
            <TableHead>Rotation</TableHead>
            <TableHead>Rotation</TableHead>
          </TableRow>

        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="w-12 md:w-16">PG</TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    alt={`${PG?.starter.name}'s photo`}
                    width={12}
                    height={12}
                    src={PG?.starter.image}
                    className="w-8 h-8 hidden sm:block rounded-full object-top object-cover border-2 border-blue-500 shadow-lg transition-transform hover:scale-110"
                  />
                </div>
                <span className="font-semibold text-xs md:text-lg text-gray-200 hover:text-blue-400 transition-colors">
                  {PG?.starter.name}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    alt={`${PG?.backup1.name}'s photo`}
                    width={12}
                    height={12}
                    src={PG?.backup1.image}
                    className="w-8 h-8 hidden sm:block rounded-full object-top object-cover border-2 border-blue-500 shadow-lg transition-transform hover:scale-110"
                  />
                </div>
                <span className="font-semibold text-xs md:text-lg text-gray-200 hover:text-blue-400 transition-colors">
                  {PG?.backup1.name}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    alt={`${PG?.backup2.name}'s photo`}
                    width={12}
                    height={12}
                    src={PG?.backup2.image}
                    className="w-8 h-8 hidden sm:block rounded-full object-top object-cover border-2 border-blue-500 shadow-lg transition-transform hover:scale-110"
                  />
                </div>
                <span className="font-semibold text-xs md:text-lg text-gray-200 hover:text-blue-400 transition-colors">
                  {PG?.backup2.name}
                </span>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-12 md:w-16">SG</TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    alt={`${SG?.starter.name}'s photo`}
                    width={12}
                    height={12}
                    src={SG?.starter.image}
                    className="w-8 h-8 hidden sm:block rounded-full object-top object-cover border-2 border-blue-500 shadow-lg transition-transform hover:scale-110"
                  />
                </div>
                <span className="font-semibold text-xs md:text-lg text-gray-200 hover:text-blue-400 transition-colors">
                  {SG?.starter.name}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    alt={`${SG?.backup1.name}'s photo`}
                    width={12}
                    height={12}
                    src={SG?.backup1.image}
                    className="w-8 h-8 hidden sm:block rounded-full object-top object-cover border-2 border-blue-500 shadow-lg transition-transform hover:scale-110"
                  />
                </div>
                <span className="font-semibold text-xs md:text-lg text-gray-200 hover:text-blue-400 transition-colors">
                  {SG?.backup1.name}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    alt={`${SG?.backup2.name}'s photo`}
                    width={12}
                    height={12}
                    src={SG?.backup2.image}
                    className="w-8 h-8 hidden sm:block rounded-full object-top object-cover border-2 border-blue-500 shadow-lg transition-transform hover:scale-110"
                  />
                </div>
                <span className="font-semibold text-xs md:text-lg text-gray-200 hover:text-blue-400 transition-colors">
                  {SG?.backup2.name}
                </span>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-12 md:w-16">SF</TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    alt={`${SF?.starter.name}'s photo`}
                    width={12}
                    height={12}
                    src={SF?.starter.image}
                    className="w-8 h-8 hidden sm:block rounded-full object-top object-cover border-2 border-blue-500 shadow-lg transition-transform hover:scale-110"
                  />
                </div>
                <span className="font-semibold text-xs md:text-lg text-gray-200 hover:text-blue-400 transition-colors">
                  {SF?.starter.name}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    alt={`${SF?.backup1.name}'s photo`}
                    width={12}
                    height={12}
                    src={SF?.backup1.image}
                    className="w-8 h-8 hidden sm:block rounded-full object-top object-cover border-2 border-blue-500 shadow-lg transition-transform hover:scale-110"
                  />
                </div>
                <span className="font-semibold text-xs md:text-lg text-gray-200 hover:text-blue-400 transition-colors">
                  {SF?.backup1.name}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    alt={`${SF?.backup2.name}'s photo`}
                    width={12}
                    height={12}
                    src={SF?.backup2.image}
                    className="w-8 h-8 hidden sm:block rounded-full object-top object-cover border-2 border-blue-500 shadow-lg transition-transform hover:scale-110"
                  />
                </div>
                <span className="font-semibold text-xs md:text-lg text-gray-200 hover:text-blue-400 transition-colors">
                  {SF?.backup2.name}
                </span>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-12 md:w-16">PF</TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    alt={`${PF?.starter.name}'s photo`}
                    width={12}
                    height={12}
                    src={PF?.starter.image}
                    className="w-8 h-8 hidden sm:block rounded-full object-top object-cover border-2 border-blue-500 shadow-lg transition-transform hover:scale-110"
                  />
                </div>
                <span className="font-semibold text-xs md:text-lg text-gray-200 hover:text-blue-400 transition-colors">
                  {PF?.starter.name}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    alt={`${PF?.backup1.name}'s photo`}
                    width={12}
                    height={12}
                    src={PF?.backup1.image}
                    className="w-8 h-8 hidden sm:block rounded-full object-top object-cover border-2 border-blue-500 shadow-lg transition-transform hover:scale-110"
                  />
                </div>
                <span className="font-semibold text-xs md:text-lg text-gray-200 hover:text-blue-400 transition-colors">
                  {PF?.backup1.name}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    alt={`${PF?.backup2.name}'s photo`}
                    width={12}
                    height={12}
                    src={PF?.backup2.image}
                    className="w-8 h-8 hidden sm:block rounded-full object-top object-cover border-2 border-blue-500 shadow-lg transition-transform hover:scale-110"
                  />
                </div>
                <span className="font-semibold text-xs md:text-lg text-gray-200 hover:text-blue-400 transition-colors">
                  {PF?.backup2.name}
                </span>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-12 md:w-16">C</TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    alt={`${C?.starter.name}'s photo`}
                    width={12}
                    height={12}
                    src={C?.starter.image}
                    className="w-8 h-8 hidden sm:block rounded-full object-top object-cover border-2 border-blue-500 shadow-lg transition-transform hover:scale-110"
                  />
                </div>
                <span className="font-semibold text-xs md:text-lg text-gray-200 hover:text-blue-400 transition-colors">
                  {C?.starter.name}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    alt={`${C?.backup1.name}'s photo`}
                    width={12}
                    height={12}
                    src={C?.backup1.image}
                    className="w-8 h-8 hidden sm:block rounded-full object-top object-cover border-2 border-blue-500 shadow-lg transition-transform hover:scale-110"
                  />
                </div>
                <span className="font-semibold text-xs md:text-lg text-gray-200 hover:text-blue-400 transition-colors">
                  {C?.backup1.name}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    alt={`${C?.backup2.name}'s photo`}
                    width={12}
                    height={12}
                    src={C?.backup2.image}
                    className="w-8 h-8 hidden sm:block rounded-full object-top object-cover border-2 border-blue-500 shadow-lg transition-transform hover:scale-110"
                  />
                </div>
                <span className="font-semibold text-xs md:text-lg text-gray-200 hover:text-blue-400 transition-colors">
                  {C?.backup2.name}
                </span>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}