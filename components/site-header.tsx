import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LockIcon } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="bg-background border-b border-border" role="banner">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16" role="navigation" aria-label="Main navigation">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity" aria-label="Go to homepage">
              <Image 
                src="/images/byu-logo.png" 
                alt="BYU Cougars Basketball Logo" 
                width={40} 
                height={40}
                priority
              />
              <h1 className="font-bold text-lg text-[#002E5D] dark:text-white">
                BYU Basketball Tracker
              </h1>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground hidden md:block">
              Unofficial BYU Basketball Roster Tracker
            </p>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  )
}

