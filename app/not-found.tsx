import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { HomeIcon } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold text-[#002E5D] dark:text-white mb-4">
            404
          </h1>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            Page Not Found
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Sorry, the page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
          <Button asChild>
            <Link href="/" className="flex items-center gap-2">
              <HomeIcon className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
} 