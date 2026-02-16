import Link from 'next/link'

export default function AnimeCard({ anime, variant = 'compact' }) {
  const { title, slug, poster, episode, type } = anime

  if (variant === 'compact') {
    return (
      <Link href={`/anime/${slug}`} className="group block">
        <div className="relative aspect-[2/3] bg-[#12121A] rounded-xl overflow-hidden border border-[#1F1F2B] group-hover:border-[#3B82F6] transition">
          <img
            src={poster || '/placeholder.jpg'}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://placehold.co/200x300/1F1F2B/3B82F6?text=No+Image'
            }}
          />
          
          {/* Episode Badge */}
          {episode && (
            <div className="absolute top-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
              Eps {episode}
            </div>
          )}
          
          {/* Type Badge */}
          {type && (
            <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
              {type}
            </div>
          )}
        </div>
        
        {/* Title */}
        <h3 className="text-sm font-medium mt-2 line-clamp-2 group-hover:text-[#3B82F6] transition">
          {title}
        </h3>
      </Link>
    )
  }

  // Default card (for other pages)
  return (
    <Link href={`/anime/${slug}`} className="group block">
      <div className="relative aspect-[2/3] bg-[#12121A] rounded-xl overflow-hidden border border-[#1F1F2B] group-hover:border-[#3B82F6] transition">
        <img
          src={poster || '/placeholder.jpg'}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-sm font-medium mt-2 line-clamp-2">{title}</h3>
    </Link>
  )
}
