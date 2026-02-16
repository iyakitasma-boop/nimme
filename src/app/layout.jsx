import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ditznime - Nonton Anime Gratis Subtitle Indonesia',
  description: 'Nonton anime subtitle Indonesia gratis, tanpa iklan, update cepat, kualitas terbaik.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-[#0B0B0F] text-white antialiased`}>
        <Header />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
