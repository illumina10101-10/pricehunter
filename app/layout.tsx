import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PriceHunter — Le Migliori Offerte Online',
  description: 'Trova i prezzi più bassi su Amazon, AliExpress, Temu e altri. Risparmia fino all\'80% sui tuoi acquisti preferiti.',
  keywords: 'offerte, prezzi bassi, sconti, amazon, aliexpress, temu, risparmio',
  openGraph: {
    title: 'PriceHunter',
    description: 'Le migliori offerte online in un solo posto',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
