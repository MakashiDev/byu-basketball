import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
