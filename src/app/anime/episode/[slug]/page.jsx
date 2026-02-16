import { api } from '@/lib/api'
import Player from '@/components/ui/Player'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FaArrowLeft } from 'react-icons/fa'

export default async function EpisodePage({ params }) {
  const { slug } = params

  try {
    const episode = await api.getEpisodeDetail(slug)
    
    const {
      title,
      episode_number,
      streams = [],
      synopsis,
      anime_title,
      anime_slug,
      next_episode,
      prev_episode
    } = episode

    return (
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-4">
          <Link 
            href={`/anime/${anime_slug}`}
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
          >
            <FaArrowLeft /> Kembali ke {anime_title}
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-xl md:text-2xl font-bold mb-2">{title}</h1>
        <p className="text-gray-400 mb-6">Episode {episode_number}</p>

        {/* Player */}
        <div className="mb-8">
          <Player streams={streams} episodeData={episode} />
        </div>

        {/* Episode Navigation */}
        <div className="flex justify-between gap-4 mb-8">
          {prev_episode && (
            <Link
              href={`/anime/episode/${prev_episode.slug}`}
              className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition"
            >
              ← Episode {prev_episode.episode}
            </Link>
          )}
          {next_episode && (
            <Link
              href={`/anime/episode/${next_episode.slug}`}
              className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition ml-auto"
            >
              Episode {next_episode.episode} →
            </Link>
          )}
        </div>

        {/* Synopsis */}
        {synopsis && (
          <div className="bg-gray-900 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Sinopsis Episode</h2>
            <p className="text-gray-300 leading-relaxed">{synopsis}</p>
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error fetching episode:', error)
    notFound()
  }
}