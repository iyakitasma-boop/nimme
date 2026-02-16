import HeroSection from '@/components/sections/HeroSection'
import { api } from '@/lib/api'
import AnimeCard from '@/components/ui/AnimeCard'
import Link from 'next/link'
import { FaFire, FaClock, FaStar } from 'react-icons/fa'

export default async function Home() {
  let data = {
    spotlight: [],
    ongoing: [],
    popular: [],
    recent: []
  }
  
  try {
    const [home, ongoing, complete] = await Promise.all([
      api.getHome().catch(() => ({})),
      api.getOngoing().catch(() => ({ data: [] })),
      api.getComplete().catch(() => ({ data: [] }))
    ])
    
    data = {
      spotlight: home.spotlight || [],
      ongoing: ongoing.data || [],
      popular: home.popular || [],
      recent: complete.data?.slice(0, 10) || []
    }
  } catch (error) {
    console.error('Error fetching home data:', error)
  }

  return (
    <div className="space-y-10 pb-10">
      <HeroSection 
        gifSrc="/hero-anime.gif"
        title="Ditznime"
        description="Tempat nobar anime gratis cuy! Update tiap hari, server stabil, subtitle Indonesia. Gaskeun!"
      />

      {/* Spotlight Section */}
      {data.spotlight.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <FaStar className="text-yellow-400 text-xl" />
            <h2 className="text-2xl font-bold">Spotlight</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {data.spotlight.map((anime, i) => (
              <AnimeCard key={i} anime={anime} />
            ))}
          </div>
        </section>
      )}

      {/* Ongoing Section */}
      {data.ongoing.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FaFire className="text-orange-500 text-xl" />
              <h2 className="text-2xl font-bold">Ongoing Anime</h2>
            </div>
            <Link href="/anime/ongoing" className="text-blue-400 hover:underline">
              Lihat Semua →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {data.ongoing.slice(0, 12).map((anime, i) => (
              <AnimeCard key={i} anime={anime} />
            ))}
          </div>
        </section>
      )}

      {/* Popular Section */}
      {data.popular.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <FaClock className="text-green-400 text-xl" />
            <h2 className="text-2xl font-bold">Popular Minggu Ini</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {data.popular.slice(0, 12).map((anime, i) => (
              <AnimeCard key={i} anime={anime} />
            ))}
          </div>
        </section>
      )}

      {/* Recent Complete */}
      {data.recent.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Anime Tamat Terbaru</h2>
            <Link href="/anime/complete" className="text-blue-400 hover:underline">
              Lihat Semua →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {data.recent.map((anime, i) => (
              <AnimeCard key={i} anime={anime} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}