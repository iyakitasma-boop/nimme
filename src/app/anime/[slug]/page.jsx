import { api } from '@/lib/api'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function AnimeDetailPage({ params }) {
  const { slug } = params

  try {
    const anime = await api.getAnimeDetail(slug)
    
    const {
      title,
      poster,
      synopsis,
      genre = [],
      status,
      episode_lists = []
    } = anime

    return (
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <img
            src={poster}
            alt={title}
            className="w-48 rounded-xl border border-[#1F1F2B]"
          />
          
          <div>
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            
            {status && (
              <div className="inline-block bg-[#1F1F2B] px-3 py-1 rounded-full text-sm mb-4">
                {status}
              </div>
            )}
            
            {genre.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {genre.map((g, i) => (
                  <Link
                    key={i}
                    href={`/anime/genre/${g.slug || g}`}
                    className="text-sm text-gray-400 hover:text-[#3B82F6] transition"
                  >
                    {g.name || g}
                  </Link>
                ))}
              </div>
            )}
            
            <p className="text-gray-300 leading-relaxed">{synopsis}</p>
          </div>
        </div>

        {/* Episode List */}
        {episode_lists.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Daftar Episode</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {episode_lists.map((ep, i) => (
                <Link
                  key={i}
                  href={`/anime/episode/${ep.slug}`}
                  className="bg-[#12121A] border border-[#1F1F2B] hover:border-[#3B82F6] p-3 rounded-lg text-center transition"
                >
                  Episode {ep.episode}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error:', error)
    notFound()
  }
}
