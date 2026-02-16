'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FaPlay, FaStar, FaCalendar, FaClock } from 'react-icons/fa'

export default function AnimeCard({ anime, index = 0 }) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  const {
    title,
    slug,
    poster,
    episode,
    status,
    rating,
    type,
    release
  } = anime

  return (
    <Link 
      href={`/anime/${slug}`}
      className="group relative block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative rounded-2xl overflow-hidden bg-card card-hover">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={imageError ? '/placeholder.jpg' : (poster || '/placeholder.jpg')}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
          
          {/* Hover Overlay */}
          <div className={`absolute inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center transform transition-transform group-hover:scale-100 scale-0 duration-300">
              <FaPlay className="text-primary ml-1" />
            </div>
          </div>

          {/* Badge Episode */}
          {episode && (
            <div className="absolute top-2 left-2 flex items-center gap-1 bg-primary/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full">
              <FaPlay className="text-[10px]" />
              Ep {episode}
            </div>
          )}

          {/* Badge Type */}
          {type && (
            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-white/10">
              {type}
            </div>
          )}

          {/* Rating */}
          {rating && (
            <div className="absolute bottom-12 left-2 flex items-center gap-1 bg-yellow-500/90 backdrop-blur-sm text-black text-xs font-bold px-2 py-1 rounded-full">
              <FaStar className="text-[10px]" />
              {rating}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition">
            {title}
          </h3>
          
          <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
            {status && (
              <div className="flex items-center gap-1">
                <div className={`w-1.5 h-1.5 rounded-full ${
                  status === 'Ongoing' ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
                }`}></div>
                <span>{status}</span>
              </div>
            )}
            
            {release && (
              <div className="flex items-center gap-1">
                <FaCalendar className="text-[10px]" />
                <span>{release}</span>
              </div>
            )}
          </div>
        </div>

        {/* Index Number (untuk trending) */}
        {index !== undefined && index < 3 && (
          <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center font-bold text-sm border-2 border-dark">
            #{index + 1}
          </div>
        )}
      </div>
    </Link>
  )
}
