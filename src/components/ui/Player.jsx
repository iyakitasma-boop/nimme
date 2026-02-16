'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { FaPlay, FaExclamationTriangle } from 'react-icons/fa'

export default function Player({ streams = [], episodeData }) {
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
        console.error('Player error:', err)
      } finally {
        setLoading(false)
      }
    }

    loadServer()
  }, [currentServer])

  if (!streams || streams.length === 0) {
    return (
      <div className="w-full aspect-video bg-gray-900 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <FaExclamationTriangle className="text-4xl mx-auto mb-2" />
          <p>Tidak ada server tersedia</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Player */}
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="loader"></div>
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-red-400">
              <FaExclamationTriangle className="text-4xl mx-auto mb-2" />
              <p>{error}</p>
            </div>
          </div>
        ) : embedUrl ? (
          <iframe
            src={embedUrl}
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; encrypted-media; picture-in-picture"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-presentation"
            title="Video Player"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <FaPlay className="text-4xl text-gray-600" />
          </div>
        )}
      </div>

      {/* Server Selector */}
      <div className="bg-gray-900 p-4 rounded-lg">
        <h3 className="text-sm font-semibold mb-3 text-gray-400">Pilih Server:</h3>
        <div className="flex flex-wrap gap-2">
          {streams.map((server, index) => (
            <button
              key={index}
              onClick={() => setCurrentServer(server)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                currentServer?.name === server.name
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {server.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}