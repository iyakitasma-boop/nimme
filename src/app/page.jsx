import HeroSection from '@/components/sections/HeroSection'
import { api } from '@/lib/api'
import AnimeCard from '@/components/ui/AnimeCard'
import Link from 'next/link'
import { 
  FaFire, 
  FaStar, 
  FaClock, 
  FaChartLine,
  FaChevronRight,
  FaPlay,
  FaCalendarAlt
} from 'react-icons/fa'

export default async function Home() {
  let data = {
    spotlight: [],
    trending: [],
    ongoing: [],
    popular: [],
    recent: [],
    schedule: []
  }
  
  try {
    const [home, ongoing, complete, schedule] = await Promise.all([
      api.getHome().catch(() => ({})),
      api.getOngoing().catch(() => ({ data: [] })),
      api.getComplete().catch(() => ({ data: [] })),
      api.getSchedule().catch(() => ({ data: [] }))
    ])
    
    data = {
      spotlight: home.spotlight?.slice(0, 6) || [],
      trending: home.trending?.slice(0, 6) || home.popular?.slice(0, 6) || [],
      ongoing: ongoing.data?.slice(0, 12) || [],
      popular: home.popular?.slice(0, 6) || [],
      recent: complete.data?.slice(0, 6) || [],
      schedule: schedule.data?.slice(0, 5) || []
    }
  } catch (error) {
    console.error('Error:', error)
  }

  return (
    <div className="min-h-screen bg-dark">
      <HeroSection 
        gifSrc="/hero-anime.gif"
        title="Ditznime"
        description="Tempat nobar anime gratis cuy! Update tiap hari, server stabil, subtitle Indonesia. Gaskeun!"
      />

      {/* Floating Stats */}
      <div className="sticky top-20 z-40 container mx-auto px-4 -mt-16 mb-10">
        <div className="glass rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Anime', value: '1000+', icon: FaStar },
            { label: 'Episode', value: '5000+', icon: FaPlay },
            { label: 'User Online', value: '10.2K', icon: FaFire },
            { label: 'Update Hari Ini', value: '12', icon: FaClock },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon className="text-2xl text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-gradient">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Section */}
      {data.trending.length > 0 && (
        <section className="container mx-auto px-4 py-10" id="trending">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                <FaFire className="text-white text-xl" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Trending Sekarang</h2>
            </div>
            <Link href="/anime/trending" className="group flex items-center gap-2 text-gray-400 hover:text-primary transition">
              Lihat Semua 
              <FaChevronRight className="group-hover:translate-x-1 transition" />
            </Link>
          </div>

          {/* Marquee Trending */}
          <div className="marquee mb-6">
            <span className="text-sm text-gray-500">
              🔥 Hot • #1 Trending • 10.2K Watching • Updated Daily • 
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {data.trending.map((anime, i) => (
              <AnimeCard key={i} anime={anime} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Ongoing Section with Background */}
      {data.ongoing.length > 0 && (
        <section className="relative py-16 mt-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
          <div className="container mx-auto px-4 relative">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <FaClock className="text-white text-xl" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Ongoing Anime</h2>
              </div>
              <Link href="/anime/ongoing" className="group flex items-center gap-2 text-gray-400 hover:text-primary transition">
                Lihat Semua 
                <FaChevronRight className="group-hover:translate-x-1 transition" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {data.ongoing.map((anime, i) => (
                <AnimeCard key={i} anime={anime} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Schedule Card */}
      {data.schedule.length > 0 && (
        <section className="container mx-auto px-4 py-10">
          <div className="glass-card rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <FaCalendarAlt className="text-white text-xl" />
              </div>
              <h2 className="text-2xl font-bold">Jadwal Rilis Hari Ini</h2>
            </div>
            
            <div className="space-y-3">
              {data.schedule.map((item, i) => (
                <Link 
                  key={i}
                  href={`/anime/episode/${item.slug}`}
                  className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-primary font-bold">{item.time || '19:00'}</span>
                    <span className="font-medium group-hover:text-primary transition">{item.title}</span>
                  </div>
                  <span className="text-sm text-gray-400">Episode {item.episode}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Complete */}
      {data.recent.length > 0 && (
        <section className="container mx-auto px-4 py-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Baru Tamat</h2>
            <Link href="/anime/complete" className="text-primary hover:underline">
              Lihat Semua →
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {data.recent.map((anime, i) => (
              <AnimeCard key={i} anime={anime} />
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90"></div>
            <img 
              src="/cta-bg.jpg" 
              alt="Background"
              className="w-full h-full object-cover mix-blend-overlay"
            />
          </div>
          
          <div className="relative p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap Nonton Anime?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Ribuan anime dengan subtitle Indonesia siap menemani harimu
            </p>
            <Link 
              href="/unlimited"
              className="inline-block px-8 py-4 bg-white text-primary font-bold rounded-full hover:shadow-xl transform hover:scale-105 transition"
            >
              Mulai Nonton Sekarang
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
              }
