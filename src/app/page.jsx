import Link from 'next/link'
import { api } from '@/lib/api'
import AnimeCard from '@/components/ui/AnimeCard'

export default async function Home() {
  let ongoing = []
  
  try {
    const res = await api.getOngoing()
    ongoing = res.data || []
  } catch (error) {
    console.error('Error fetching ongoing:', error)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section - Minimal ala Kaelnime */}
      <section className="max-w-3xl mx-auto text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-gradient">Ditznime</span>
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          Ditznime adalah situs anime gratis tanpa iklan untuk menonton anime gratis
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <form action="/anime/search" method="GET" className="relative">
            <input
              type="text"
              name="q"
              placeholder="Cari judul anime..."
              className="w-full h-14 bg-[#12121A] border border-[#1F1F2B] rounded-2xl px-6 pr-24 text-white placeholder-gray-500 focus:outline-none focus:border-[#3B82F6] transition"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 h-10 px-6 bg-[#3B82F6] text-white rounded-xl text-sm font-medium hover:bg-[#2563EB] transition"
            >
              Cari
            </button>
          </form>
          
          {/* Top Search */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-sm">
            <span className="text-gray-500">Top search:</span>
            {['Demon Slayer', 'One Piece', 'Jujutsu Kaisen', 'Solo Leveling'].map((term, i) => (
              <Link
                key={i}
                href={`/anime/search?q=${encodeURIComponent(term)}`}
                className="text-gray-400 hover:text-[#3B82F6] transition"
              >
                {term}
                {i < 3 ? ',' : ''}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Database A-Z */}
      <section className="max-w-4xl mx-auto mt-12">
        <div className="bg-[#12121A] rounded-2xl p-6 border border-[#1F1F2B]">
          <h2 className="text-lg font-medium mb-4">Database Anime A - Z</h2>
          <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-13 gap-2">
            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
              <Link
                key={letter}
                href={`/anime/letter/${letter}`}
                className="aspect-square flex items-center justify-center bg-[#1F1F2B] hover:bg-[#3B82F6] rounded-lg text-sm font-medium transition"
              >
                {letter}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ongoing Anime Section - ala Kaelnime */}
      {ongoing.length > 0 && (
        <section className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium">Anime OnGoing</h2>
            <Link href="/anime/ongoing" className="text-sm text-[#3B82F6] hover:underline">
              Lihat Semua →
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {ongoing.slice(0, 12).map((anime, i) => (
              <AnimeCard key={i} anime={anime} variant="compact" />
            ))}
          </div>
        </section>
      )}

      {/* Donate Admin - Fixed Position */}
      <div className="fixed bottom-6 left-6 z-40">
        <Link
          href="/donate"
          className="flex items-center gap-2 bg-[#12121A] border border-[#1F1F2B] px-4 py-2 rounded-full text-sm hover:border-[#3B82F6] transition"
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span className="text-gray-300">Donate Admin</span>
        </Link>
      </div>
    </div>
  )
}
