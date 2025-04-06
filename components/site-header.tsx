import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LockIcon } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/byu-logo.png" alt="BYU Logo" width={40} height={40} />
              <span className="font-bold text-lg text-[#002E5D]">BYU Basketball Tracker</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-500 hidden md:block">Unofficial BYU Basketball Roster Tracker</p>
          </div>
        </div>
      </div>
    </header>
  )
}

