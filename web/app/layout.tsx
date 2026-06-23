import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'StyleForge — Personal Style Quiz',
  description: 'An AI-powered style quiz that generates a reusable fashion profile. Private, no account needed.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{children}</body>
    </html>
  )
}
