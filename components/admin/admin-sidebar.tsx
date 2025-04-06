"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, UserPlus, Settings, BarChart3, ChevronRight } from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname()

  const links = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Players",
      href: "/admin/dashboard",
      icon: Users,
      active: pathname.includes("/admin/players") || pathname === "/admin/dashboard",
    },
    {
      name: "Add Player",
      href: "/admin/players/new",
      icon: UserPlus,
    },
    {
      name: "Statistics",
      href: "/admin/stats",
      icon: BarChart3,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  return (
    <aside className="hidden md:block w-64 bg-white border-r min-h-[calc(100vh-4rem)]">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-[#002E5D] mb-6">Admin Panel</h2>
        <nav className="space-y-1">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                pathname === link.href || link.active
                  ? "bg-[#002E5D]/10 text-[#002E5D] font-medium"
                  : "text-gray-600 hover:bg-gray-100",
              )}
            >
              <link.icon className="h-5 w-5" />
              <span>{link.name}</span>
              {(pathname === link.href || link.active) && <ChevronRight className="h-4 w-4 ml-auto" />}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}

