import Link from 'next/link'
import Image from 'next/image'

export default function AnimeCard({ anime }) {
  const {
    title,
    slug,
    poster,
    episode,
    status,
    rating,
    type
  } = anime

  return (
    <Link href={`/anime/${slug}`} className="group">
      <div className="relative overflow-hidden rounded-lg bg-gray-900 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Poster */}
        <div className="relative aspect-[3/4]">
          <img
            src={poster || '/placeholder.jpg'}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x400?text=No+Image'
            }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          {/* Badge Episode */}
          {episode && (
            <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
              Ep {episode}
            </div>
          )}
          
          {/* Badge Type */}
          {type && (
            <div className="absolute top-2 right-2 bg-gray-900/80 text-white text-xs px-2 py-1 rounded">
              {type}
            </div>
          )}
          
          {/* Rating */}
          {rating && (
            <div className="absolute bottom-2 left-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
              ⭐ {rating}
            </div>
          )}
          
          {/* Status */}
          {status && (
            <div className={`absolute bottom-2 right-2 text-xs px-2 py-1 rounded ${
              status === 'Ongoing' ? 'bg-green-600' : 'bg-gray-600'
            }`}>
              {status}
            </div>
          )}
        </div>
        
        {/* Title */}
        <div className="p-2">
          <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-blue-400 transition">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  )
}