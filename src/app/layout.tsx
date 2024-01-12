import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

import dotenv from 'dotenv'
import Link from 'next/link'
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
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="relative">
          {children}
        </main>
        <footer className="bg-slate-900 text-white p-10 flex items-baseline align-middle mt-auto">
          <div className="m-auto">
            (C) 2023 Henzisoft
          </div>
          <div className="m-auto">
            <div>
              FuDisc!
            </div>
            <div>
              <Link className="text-blue-400" href='https://play.google.com/store/apps/details?id=com.henzisoft.puttmaster9000&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
                Download now!
              </Link>
            </div>
            <div>
              <Link href="mailto:fudisc@henzi.fi" className='text-blue-400'>Contact us</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
