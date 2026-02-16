import { api } from '@/lib/api'
import Player from '@/components/ui/Player'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { 
  FaArrowLeft, 
  FaDownload, 
  FaShare, 
  FaBookmark,
  FaThumbsUp,
  FaComment
} from 'react-icons/fa'

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
      <div className="min-h-screen bg-dark pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Navigation */}
          <div className="mb-6">
            <Link 
              href={`/anime/${anime_slug}`}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition" />
              Kembali ke {anime_title}
            </Link>
          </div>

          {/* Title Section */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
              <p className="text-gray-400">Episode {episode_number}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition">
                <FaDownload />
              </button>
              <button className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition">
                <FaShare />
              </button>
              <button className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition">
                <FaBookmark />
              </button>
            </div>
          </div>

          {/* Player */}
          <div className="mb-8">
            <Player streams={streams} episodeData={episode} />
          </div>

          {/* Episode Navigation */}
          <div className="flex justify-between gap-4 mb-8">
            {prev_episode && (
              <Link
                href={`/anime/episode/${prev_episode.slug}`}
                className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition" />
                <div>
                  <div className="text-sm text-gray-400">Previous</div>
                  <div className="font-medium">Episode {prev_episode.episode}</div>
                </div>
              </Link>
            )}
            
            {next_episode && (
              <Link
                href={`/anime/episode/${next_episode.slug}`}
                className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition ml-auto text-right"
              >
                <div>
                  <div className="text-sm text-gray-400">Next</div>
                  <div className="font-medium">Episode {next_episode.episode}</div>
                </div>
                <FaArrowLeft className="rotate-180 group-hover:translate-x-1 transition" />
              </Link>
            )}
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Synopsis */}
            <div className="lg:col-span-2">
              {synopsis && (
                <div className="bg-card rounded-2xl p-6">
                  <h2 className="text-xl font-bold mb-4">Sinopsis</h2>
                  <p className="text-gray-300 leading-relaxed">{synopsis}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Stats */}
              <div className="bg-card rounded-2xl p-6">
                <h3 className="font-semibold mb-4">Info Episode</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Dirilis</span>
                    <span className="font-medium">12 Jan 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Durasi</span>
                    <span className="font-medium">24 Menit</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Penonton</span>
                    <span className="font-medium">10.2K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rating</span>
                    <span className="font-medium text-yellow-400">⭐ 4.8</span>
                  </div>
                </div>
              </div>

              {/* Interaction */}
              <div className="bg-card rounded-2xl p-6">
                <div className="flex items-center justify-around">
                  <button className="flex flex-col items-center gap-1 group">
                    <div className="p-3 bg-white/5 group-hover:bg-primary/20 rounded-full transition">
                      <FaThumbsUp className="group-hover:text-primary" />
                    </div>
                    <span className="text-xs">2.1K</span>
                  </button>
                  <button className="flex flex-col items-center gap-1 group">
                    <div className="p-3 bg-white/5 group-hover:bg-primary/20 rounded-full transition">
                      <FaComment className="group-hover:text-primary" />
                    </div>
                    <span className="text-xs">345</span>
                  </button>
                  <button className="flex flex-col items-center gap-1 group">
                    <div className="p-3 bg-white/5 group-hover:bg-primary/20 rounded-full transition">
                      <FaBookmark className="group-hover:text-primary" />
                    </div>
                    <span className="text-xs">678</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error:', error)
    notFound()
  }
                }
