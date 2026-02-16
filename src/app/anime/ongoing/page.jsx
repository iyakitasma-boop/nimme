'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import AnimeCard from '@/components/ui/AnimeCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function OngoingPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await api.getOngoing(page)
        setData(res.data || [])
      } catch (error) {
        console.error('Error:', error)
        setData([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [page])

  if (loading) return <LoadingSpinner />

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Anime OnGoing</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {data.map((anime, i) => (
          <AnimeCard key={i} anime={anime} variant="compact" />
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setPage(p => p + 1)}
          className="px-6 py-2 bg-[#1F1F2B] hover:bg-[#3B82F6] rounded-lg text-sm transition"
        >
          Load More
        </button>
      </div>
    </div>
  )
}
