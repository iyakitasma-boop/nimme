'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { api } from '@/lib/api'
import AnimeCard from '@/components/ui/AnimeCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const searchAnime = async () => {
      if (!query) {
        setResults([])
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const data = await api.searchAnime(query)
        setResults(data.data || [])
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setLoading(false)
      }
    }

    searchAnime()
  }, [query])

  if (loading) return <LoadingSpinner />

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">
        Hasil Pencarian: "{query}"
      </h1>
      <p className="text-gray-400 mb-6">
        Ditemukan {results.length} hasil
      </p>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {results.map((anime, i) => (
            <AnimeCard key={i} anime={anime} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400">Tidak ada anime ditemukan</p>
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SearchContent />
    </Suspense>
  )
}