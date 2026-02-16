import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileNav from '@/components/layout/MobileNav'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ditznime - Nonton Anime Gratis Subtitle Indonesia',
  description: 'Nonton anime subtitle Indonesia gratis, update cepat, kualitas terbaik, server stabil. Streaming dan download anime batch lengkap.',
  keywords: 'nonton anime, anime sub indo, streaming anime, download anime, anime batch',
  authors: [{ name: 'Ditzz' }],
  openGraph: {
    title: 'Ditznime - Nonton Anime Gratis',
    description: 'Platform streaming anime gratis dengan koleksi lengkap',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-dark text-white min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow pt-16 pb-20 md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  )
}
