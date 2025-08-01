import type { Metadata } from 'next'
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for BYU Basketball Tracker - Unofficial fan page',
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-[#002E5D] dark:text-white">
            Terms of Service
          </h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-6">
              Last updated: July 31st, 2025
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-[#002E5D] dark:text-white">
                Acceptance of Terms
              </h2>
              <p className="mb-4">
                By accessing and using BYU Basketball Tracker, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-[#002E5D] dark:text-white">
                Use License
              </h2>
              <p className="mb-4">
                Permission is granted to temporarily access the materials on BYU Basketball Tracker for personal, non-commercial transitory viewing only.
              </p>
              <p className="mb-4">This license shall automatically terminate if you violate any of these restrictions and may be terminated by us at any time.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-[#002E5D] dark:text-white">
                Disclaimer
              </h2>
              <p className="mb-4">
                The materials on BYU Basketball Tracker are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-[#002E5D] dark:text-white">
                Limitations
              </h2>
              <p className="mb-4">
                In no event shall BYU Basketball Tracker or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-[#002E5D] dark:text-white">
                Accuracy of Materials
              </h2>
              <p className="mb-4">
                The materials appearing on BYU Basketball Tracker could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our website are accurate, complete, or current.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-[#002E5D] dark:text-white">
                Links
              </h2>
              <p className="mb-4">
                BYU Basketball Tracker has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by BYU Basketball Tracker of the site.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-[#002E5D] dark:text-white">
                Modifications
              </h2>
              <p className="mb-4">
                We may revise these terms of service for our website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms and Conditions of Use.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-[#002E5D] dark:text-white">
                Official Disclaimer
              </h2>
              <p className="mb-4">
                This is an unofficial fan page and is not affiliated with or endorsed by BYU Athletics, Brigham Young University, or any official BYU organization. All information provided is for entertainment purposes only.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-[#002E5D] dark:text-white">
                Governing Law
              </h2>
              <p className="mb-4">
                These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
} 