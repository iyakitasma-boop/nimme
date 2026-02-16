import { api } from '@/lib/api'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FaPlay, FaDownload, FaStar, FaCalendar, FaTag } from 'react-icons/fa'

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
      rating,
      release,
      studio,
      duration,
      episode_lists = [],
      batch
    } = anime

    return (
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="relative rounded-xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
          <div className="relative h-64 md:h-96">
            <img
              src={poster}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8">
            <div className="flex items-end gap-6">
              <img
                src={poster}
                alt={title}
                className="w-24 md:w-32 rounded-lg shadow-2xl hidden md:block"
              />
              <div>
                <h1 className="text-2xl md:text-4xl font-bold mb-2">{title}</h1>
                <div className="flex flex-wrap gap-3 text-sm">
                  {rating && (
                    <span className="flex items-center gap-1 bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full">
                      <FaStar /> {rating}
                    </span>
                  )}
                  {status && (
                    <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full">
                      {status}
                    </span>
                  )}
                  {release && (
                    <span className="flex items-center gap-1 bg-gray-800 text-gray-300 px-3 py-1 rounded-full">
                      <FaCalendar /> {release}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-1">
            <div className="bg-gray-900 rounded-xl p-6 space-y-4">
              {studio && (
                <div>
                  <h3 className="text-gray-400 text-sm mb-1">Studio</h3>
                  <p className="font-semibold">{studio}</p>
                </div>
              )}
              {duration && (
                <div>
                  <h3 className="text-gray-400 text-sm mb-1">Durasi</h3>
                  <p className="font-semibold">{duration}</p>
                </div>
              )}
              {genre && genre.length > 0 && (
                <div>
                  <h3 className="text-gray-400 text-sm mb-2">Genre</h3>
                  <div className="flex flex-wrap gap-2">
                    {genre.map((g, i) => (
                      <Link
                        key={i}
                        href={`/anime/genre/${g.slug || g}`}
                        className="bg-gray-800 hover:bg-blue-600 text-sm px-3 py-1 rounded-full transition"
                      >
                        {g.name || g}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2">
            {/* Synopsis */}
            <div className="bg-gray-900 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Sinopsis</h2>
              <p className="text-gray-300 leading-relaxed">{synopsis}</p>
            </div>

            {/* Batch Download */}
            {batch && (
              <div className="bg-gray-900 rounded-xl p-6 mb-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FaDownload className="text-blue-400" /> Batch Download
                </h2>
                <div className="space-y-2">
                  {batch.map((item, i) => (
                    <a
                      key={i}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition"
                    >
                      <span>{item.quality}</span>
                      <span className="text-blue-400">Download →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Episode List */}
            {episode_lists && episode_lists.length > 0 && (
              <div className="bg-gray-900 rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FaPlay className="text-green-400" /> Daftar Episode
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {episode_lists.map((ep, i) => (
                    <Link
                      key={i}
                      href={`/anime/episode/${ep.slug}`}
                      className="flex items-center justify-between bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition"
                    >
                      <span>Episode {ep.episode}</span>
                      <span className="text-green-400">Nonton →</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching anime detail:', error)
    notFound()
  }
}