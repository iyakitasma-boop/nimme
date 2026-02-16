'use client'

import { useState, useEffect, useRef } from 'react'
import { api } from '@/lib/api'
import { 
  FaPlay, 
  FaPause, 
  FaVolumeUp, 
  FaVolumeMute, 
  FaExpand,
  FaCompress,
  FaServer,
  FaExclamationTriangle,
  FaSpinner
} from 'react-icons/fa'

export default function Player({ streams = [], episodeData }) {
  const [currentServer, setCurrentServer] = useState(null)
  const [embedUrl, setEmbedUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showServers, setShowServers] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const playerRef = useRef(null)

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

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  if (!streams || streams.length === 0) {
    return (
      <div className="w-full aspect-video bg-card rounded-2xl flex items-center justify-center">
        <div className="text-center text-gray-400">
          <FaExclamationTriangle className="text-4xl mx-auto mb-2" />
          <p>Tidak ada server tersedia</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Player Container */}
      <div 
        ref={playerRef}
        className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden group"
      >
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-card">
            <div className="text-center">
              <FaSpinner className="text-4xl text-primary animate-spin mx-auto mb-2" />
              <p className="text-gray-400">Memuat server...</p>
            </div>
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center bg-card">
            <div className="text-center">
              <FaExclamationTriangle className="text-4xl text-red-500 mx-auto mb-2" />
              <p className="text-red-400">{error}</p>
              <button 
                onClick={() => setShowServers(true)}
                className="mt-4 px-4 py-2 bg-primary rounded-lg hover:bg-primary-dark transition"
              >
                Ganti Server
              </button>
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
        ) : null}

        {/* Custom Controls (optional, bisa diaktifkan kalo pake HTML5 video) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Controls content */}
        </div>
      </div>

      {/* Server Selector */}
      <div className="bg-card rounded-xl p-4">
        <button
          onClick={() => setShowServers(!showServers)}
          className="flex items-center gap-2 text-gray-400 hover:text-primary transition mb-3"
        >
          <FaServer />
          <span className="font-medium">Pilih Server</span>
          <span className="ml-auto text-sm">{currentServer?.name}</span>
        </button>

        {showServers && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
            {streams.map((server, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentServer(server)
                  setShowServers(false)
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  currentServer?.name === server.name
                    ? 'bg-primary text-white'
                    : 'bg-white/5 hover:bg-white/10 text-gray-300'
                }`}
              >
                {server.name}
                {server.quality && (
                  <span className="ml-1 text-xs opacity-75">{server.quality}</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info Bar */}
      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Server Siap
          </span>
          <span>•</span>
          <span>{streams.length} Server Tersedia</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-white/5 rounded">HD</span>
          <span className="px-2 py-1 bg-white/5 rounded">Sub Indo</span>
        </div>
      </div>
    </div>
  )
            }
