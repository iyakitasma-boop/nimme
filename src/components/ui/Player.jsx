'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'

export default function Player({ streams = [] }) {
  const [currentServer, setCurrentServer] = useState(null)
  const [embedUrl, setEmbedUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (streams.length > 0) {
      setCurrentServer(streams[0])
    }
  }, [streams])

  useEffect(() => {
    const loadServer = async () => {
      if (!currentServer) return
      
      setLoading(true)
      setError('')
      
      try {
        if (currentServer.server_id) {
          const data = await api.getStreamServer(currentServer.server_id)
          setEmbedUrl(data.embed_url || data.url)
        } else {
          setEmbedUrl(currentServer.embed_url || currentServer.url)
        }
      } catch (err) {
        setError('Gagal memuat server. Coba server lain.')
      } finally {
        setLoading(false)
      }
    }

    loadServer()
  }, [currentServer])

  if (!streams || streams.length === 0) {
    return (
      <div className="w-full aspect-video bg-[#12121A] rounded-xl flex items-center justify-center border border-[#1F1F2B]">
        <p className="text-gray-400">Tidak ada server tersedia</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Player Frame */}
      <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-[#1F1F2B]">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[#12121A]">
            <div className="w-8 h-8 border-2 border-[#3B82F6] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[#12121A]">
            <p className="text-red-400">{error}</p>
          </div>
        ) : embedUrl ? (
          <iframe
            src={embedUrl}
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; encrypted-media"
            title="Video Player"
          />
        ) : null}
      </div>

      {/* Server Selector */}
      <div className="flex flex-wrap gap-2">
        {streams.map((server, index) => (
          <button
            key={index}
            onClick={() => setCurrentServer(server)}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              currentServer?.name === server.name
                ? 'bg-[#3B82F6] text-white'
                : 'bg-[#1F1F2B] text-gray-300 hover:bg-[#2A2A35]'
            }`}
          >
            {server.name}
          </button>
        ))}
      </div>
    </div>
  )
}
