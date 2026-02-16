import Link from 'next/link'
import { api } from '@/lib/api'
import OngoingList from '@/components/ui/OngoingList'

export default async function Home() {
  let ongoing = []
  
  try {
    const res = await api.getOngoing()
    ongoing = res.data || []
  } catch (error) {
    console.error('Error:', error)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section - PERSIS Kaelnime */}
      <div className="max-w-3xl mx-auto text-center py-12">
        <h1 className="text-4xl font-bold mb-3">
          Ditz<span className="text-[#3B82F6]">nime</span>
        </h1>
        <p className="text-gray-400 mb-8">
          Ditznime adalah situs anime gratis tanpa iklan untuk menonton anime gratis
        </p>
        
        {/* Search */}
        <form action="/anime/search" method="GET" className="relative max-w-2xl mx-auto">
          <input
            type="text"
            name="q"
            placeholder="Cari judul anime..."
            className="w-full h-12 bg-[#12121A] border border-[#1F1F2B] rounded-xl px-4 pr-24 text-white placeholder-gray-500 focus:outline-none focus:border-[#3B82F6]"
          />
          <button
            type="submit"
            className="absolute right-1 top-1 h-10 px-6 bg-[#3B82F6] text-white rounded-lg text-sm hover:bg-[#2563EB] transition"
          >
            Cari
          </button>
        </form>
        
        {/* Top Search */}
        <div className="flex flex-wrap items-center justify-center gap-1 mt-3 text-sm">
          <span className="text-gray-500">Top search:</span>
          {['Demon Slayer: Kimetsu no Y...', 'One Piece', 'Jujutsu Kaisen'].map((term, i) => (
            <Link
              key={i}
              href={`/anime/search?q=${encodeURIComponent(term)}`}
              className="text-gray-400 hover:text-[#3B82F6] transition"
            >
              {term}{i < 2 ? ',' : ''}
            </Link>
          ))}
        </div>
      </div>

      {/* Database A-Z - PERSIS */}
      <div className="max-w-4xl mx-auto mt-8">
        <h2 className="text-lg font-medium mb-4">Database Anime A - Z</h2>
        <div className="grid grid-cols-9 sm:grid-cols-13 md:grid-cols-13 gap-2">
          {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
            <Link
              key={letter}
              href={`/anime/letter/${letter}`}
              className="aspect-square flex items-center justify-center bg-[#12121A] border border-[#1F1F2B] hover:border-[#3B82F6] rounded-lg text-sm font-medium transition"
            >
              {letter}
            </Link>
          ))}
        </div>
      </div>

      {/* Ongoing List - PERSIS Kaelnime (kiri) */}
      {ongoing.length > 0 && (
        <div className="mt-12">
          <h2 className="text-lg font-medium mb-4">Anime OnGoing</h2>
          <OngoingList items={ongoing.slice(0, 10)} />
        </div>
      )}
    </div>
  )
}
