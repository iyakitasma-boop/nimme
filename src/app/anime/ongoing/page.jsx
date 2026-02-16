'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import AnimeCard from '@/components/ui/AnimeCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import Pagination from '@/components/ui/Pagination'

export default function OngoingPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await api.getOngoing(page)
        setData(res.data || [])
        setTotalPages(res.totalPages || 1)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [page])

  if (loading) return <LoadingSpinner />

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Ongoing Anime</h1>
      
      {data.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {data.map((anime, i) => (
              <AnimeCard key={i} anime={anime} />
            ))}
          </div>
          
          <Pagination 
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      ) : (
        <p className="text-center text-gray-400 py-12">Tidak ada data</p>
      )}
    </div>
  )
}