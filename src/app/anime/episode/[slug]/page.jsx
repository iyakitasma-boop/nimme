import { api } from '@/lib/api'
import Player from '@/components/ui/Player'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function EpisodePage({ params }) {
  const { slug } = params

  try {
    const episode = await api.getEpisodeDetail(slug)
    
    const {
      title,
      episode_number,
      streams = [],
      anime_title,
      anime_slug,
      prev_episode,
      next_episode
    } = episode

    return (
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          href={`/anime/${anime_slug}`}
          className="inline-block mb-4 text-gray-400 hover:text-[#3B82F6] transition"
        >
          ← Kembali ke {anime_title}
        </Link>

        {/* Title */}
        <h1 className="text-xl font-bold mb-1">{title}</h1>
        <p className="text-gray-400 mb-6">Episode {episode_number}</p>

        {/* Player */}
        <Player streams={streams} />

        {/* Episode Navigation */}
        <div className="flex justify-between mt-6">
          {prev_episode && (
            <Link
              href={`/anime/episode/${prev_episode.slug}`}
              className="bg-[#1F1F2B] hover:bg-[#3B82F6] px-4 py-2 rounded-lg text-sm transition"
            >
              ← Episode {prev_episode.episode}
            </Link>
          )}
          {next_episode && (
            <Link
              href={`/anime/episode/${next_episode.slug}`}
              className="bg-[#1F1F2B] hover:bg-[#3B82F6] px-4 py-2 rounded-lg text-sm transition ml-auto"
            >
              Episode {next_episode.episode} →
            </Link>
          )}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error:', error)
    notFound()
  }
}
