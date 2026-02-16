import { api } from '@/lib/api'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function AnimePage({ params }) {
  const { slug } = params

  try {
    const anime = await api.getAnimeDetail(slug)
    
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          <img 
            src={anime.poster} 
            alt={anime.title}
            className="w-48 rounded-xl border border-[#1F1F2B]"
          />
          <div>
            <h1 className="text-2xl font-bold mb-2">{anime.title}</h1>
            <p className="text-gray-400 mb-4">{anime.synopsis}</p>
            
            <h2 className="font-medium mb-2">Daftar Episode</h2>
            <div className="grid grid-cols-4 gap-2">
              {anime.episode_lists?.map((ep, i) => (
                <Link
                  key={i}
                  href={`/anime/episode/${ep.slug}`}
                  className="bg-[#12121A] border border-[#1F1F2B] hover:border-[#3B82F6] p-2 rounded-lg text-center text-sm transition"
                >
                  Ep {ep.episode}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  } catch {
    notFound()
  }
}
