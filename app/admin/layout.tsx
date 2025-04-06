import type { ReactNode } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { requireAuth } from "@/lib/auth"


export default function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  // This will redirect to login if not authenticated
  requireAuth()

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
      <div className="p-4 text-center text-sm text-gray-500 border-t">
        <p>This is an unofficial fan page, not affiliated with or endorsed by BYU Athletics.</p>
      </div>
    </div>
  )
}

