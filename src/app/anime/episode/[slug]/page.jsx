import { api } from '@/lib/api'
import Player from '@/components/ui/Player'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function EpisodePage({ params }) {
  const { slug } = params

  try {
    const episode = await api.getEpisodeDetail(slug)
    
    return (
      <div className="container mx-auto px-4 py-8">
        <Link 
          href={`/anime/${episode.anime_slug}`}
          className="inline-block mb-4 text-gray-400 hover:text-[#3B82F6]"
        >
          ← Back
        </Link>

        <h1 className="text-xl font-bold mb-4">{episode.title}</h1>
        
        <Player streams={episode.streams} />
        
        {/* Episode Navigation */}
        <div className="flex justify-between mt-4">
          {episode.prev_episode && (
            <Link
              href={`/anime/episode/${episode.prev_episode.slug}`}
              className="bg-[#1F1F2B] hover:bg-[#3B82F6] px-4 py-2 rounded-lg text-sm transition"
            >
              ← Prev
            </Link>
          )}
          {episode.next_episode && (
            <Link
              href={`/anime/episode/${episode.next_episode.slug}`}
              className="bg-[#1F1F2B] hover:bg-[#3B82F6] px-4 py-2 rounded-lg text-sm transition ml-auto"
            >
              Next →
            </Link>
          )}
        </div>
      </div>
    )
  } catch {
    notFound()
  }
}
