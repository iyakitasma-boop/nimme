'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function OngoingList({ items }) {
  const [showAll, setShowAll] = useState(false)
  const displayItems = showAll ? items : items.slice(0, 5)

  return (
    <div className="space-y-2">
      {displayItems.map((item, i) => (
        <Link
          key={i}
          href={`/anime/${item.slug}`}
          className="flex items-center gap-3 p-3 bg-[#12121A] border border-[#1F1F2B] hover:border-[#3B82F6] rounded-xl transition group"
        >
          {/* Title with Japanese (simulasi) */}
          <span className="text-lg font-medium text-gray-400 w-16">
            {String.fromCharCode(0x30A0 + i)}...
          </span>
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium group-hover:text-[#3B82F6] transition">
                {item.title}
              </span>
              {item.episode && (
                <span className="text-xs text-gray-500">Eps {item.episode}</span>
              )}
            </div>
            {item.type && (
              <span className="text-xs text-gray-500">{item.type}</span>
            )}
          </div>
        </Link>
      ))}
      
      {items.length > 5 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="w-full py-2 text-sm text-gray-400 hover:text-[#3B82F6] transition"
        >
          Show More...
        </button>
      )}
    </div>
  )
}
