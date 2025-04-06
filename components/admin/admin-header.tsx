"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LogOut, Menu } from "lucide-react"

export function AdminHeader() {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      })
      router.push("/admin/login")
      router.refresh()
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <header className="bg-[#002E5D] dark:bg-[#001a33] text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <Image src="/images/byu-logo.png" alt="BYU Logo" width={40} height={40} />
              <span className="font-bold text-lg">BYU Basketball Admin</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/admin/dashboard" className="hover:text-white/80 dark:text-blue-400 dark:hover:text-blue-300">
              Dashboard
            </Link>
            <Link href="/admin/players/new" className="hover:text-white/80 dark:text-blue-400 dark:hover:text-blue-300">
              Add Player
            </Link>
            <Link href="/" className="hover:text-white/80 dark:text-blue-400 dark:hover:text-blue-300" target="_blank">
              View Site
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-white/10 dark:border-gray-700">
            <div className="flex flex-col space-y-3">
              <Link href="/admin/dashboard" className="px-2 py-1 hover:bg-white/10 dark:hover:bg-blue-900/30 rounded">
                Dashboard
              </Link>
              <Link href="/admin/players/new" className="px-2 py-1 hover:bg-white/10 dark:hover:bg-blue-900/30 rounded">
                Add Player
              </Link>
              <Link href="/" className="px-2 py-1 hover:bg-white/10 dark:hover:bg-blue-900/30 rounded" target="_blank">
                View Site
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="justify-start gap-2">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

