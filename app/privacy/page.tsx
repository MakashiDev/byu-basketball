import type { Metadata } from 'next'
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for BYU Basketball Tracker - Unofficial fan page',
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-[#002E5D] dark:text-white">
            Privacy Policy
          </h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-6">
              Last updated: July 31st, 2025
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-[#002E5D] dark:text-white">
                Information We Collect
              </h2>
              <p className="mb-4">
                BYU Basketball Tracker is an unofficial fan page that collects minimal information to provide the best user experience.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Analytics data through Google Analytics and Vercel Analytics</li>
                <li>User preferences (theme settings)</li>
                <li>Basic usage statistics</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-[#002E5D] dark:text-white">
                How We Use Information
              </h2>
              <p className="mb-4">
                We use the collected information to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Improve website performance and user experience</li>
                <li>Analyze site usage patterns</li>
                <li>Maintain and update player information</li>
                <li>Provide relevant content to users</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-[#002E5D] dark:text-white">
                Data Protection
              </h2>
              <p className="mb-4">
                We implement appropriate security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Secure hosting through Vercel</li>
                <li>HTTPS encryption</li>
                <li>Regular security updates</li>
                <li>Limited data collection</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-[#002E5D] dark:text-white">
                Third-Party Services
              </h2>
              <p className="mb-4">
                We use the following third-party services:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Google Analytics for website analytics</li>
                <li>Vercel for hosting and analytics</li>
                <li>PostHog for product analytics</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-[#002E5D] dark:text-white">
                Contact Information
              </h2>
              <p className="mb-4">
                If you have any questions about this privacy policy, please contact us through the website.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-[#002E5D] dark:text-white">
                Disclaimer
              </h2>
              <p className="mb-4">
                This is an unofficial fan page and is not affiliated with or endorsed by BYU Athletics, Brigham Young University, or any official BYU organization.
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
} 