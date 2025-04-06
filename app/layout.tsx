import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { PostHogProvider } from '@/components/PostHogProvider'

export const metadata: Metadata = {
  title: 'BYU Roster 2025-26',
  description: 'Christian Furr', 
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <PostHogProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
        </PostHogProvider>
      </body>
    </html>
  )
}
