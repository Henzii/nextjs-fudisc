import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

import dotenv from 'dotenv'
dotenv.config()

export const metadata: Metadata = {
  title: 'FuDisc',
  description: 'FuDisc - The best score keeping app for disc golf.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
