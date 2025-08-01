import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { PostHogProvider } from '@/components/PostHogProvider'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: {
    default: 'BYU Basketball Roster 2025-26 | Unofficial Fan Page',
    template: '%s | BYU Basketball'
  },
  description: 'Complete BYU Basketball roster for the 2025-26 season. Track player commitments, transfers, and team depth chart. Unofficial fan page with up-to-date player information.',
  keywords: ['BYU Basketball', 'BYU Cougars', 'college basketball', 'roster', 'players', 'depth chart', 'transfers', 'commitments', '2025-26 season'],
  authors: [{ name: 'Christian Furr' }],
  creator: 'Christian Furr',
  publisher: 'BYU Basketball Fan Page',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('http://byu.christianfurr.dev/'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'http://byu.christianfurr.dev/',
    title: 'BYU Basketball Roster 2025-26',
    description: 'Complete BYU Basketball roster for the 2025-26 season. Track player commitments, transfers, and team depth chart.',
    siteName: 'BYU Basketball Fan Page',
    images: [
      {
        url: '/images/byu-logo.png',
        width: 1200,
        height: 630,
        alt: 'BYU Basketball Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BYU Basketball Roster 2025-26',
    description: 'Complete BYU Basketball roster for the 2025-26 season. Track player commitments, transfers, and team depth chart.',
    images: ['/images/byu-logo.png'],
    creator: '@christianfurr',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#002E5D" />
        <meta name="msapplication-TileColor" content="#002E5D" />
      </head>
      <body>
        <PostHogProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
        </PostHogProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
