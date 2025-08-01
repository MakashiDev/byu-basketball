import type { ReactNode } from "react"
import type { Metadata } from 'next'
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { requireAuth } from "@/lib/auth"

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'BYU Basketball Admin Dashboard',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

export default async function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  // This will redirect to login if not authenticated
  

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#000102]">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
      <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400 border-t dark:border-gray-800">
        <p>This is an unofficial fan page, not affiliated with or endorsed by BYU Athletics.</p>
      </div>
    </div>
  )
}

