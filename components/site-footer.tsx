import Link from "next/link"
import Image from "next/image"

export function SiteFooter() {
  return (
    <footer className="bg-background border-t border-border mt-auto" role="contentinfo">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image 
                src="/images/byu-logo.png" 
                alt="BYU Cougars Basketball Logo" 
                width={32} 
                height={32}
              />
              <h3 className="font-bold text-lg text-[#002E5D] dark:text-white">
                BYU Basketball Tracker
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Unofficial fan page tracking BYU Basketball roster, transfers, and team updates for the 2025-26 season.
            </p>
            <p className="text-xs text-muted-foreground">
              Not affiliated with or endorsed by BYU Athletics.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-[#002E5D] dark:text-white">Quick Links</h4>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
                    Admin
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-[#002E5D] dark:text-white">About</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Created by Christian Furr</p>
              <p>Big 12 Conference</p>
              <p>2025-26 Season</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground text-center md:text-left">
              © 2024 BYU Basketball Tracker. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 