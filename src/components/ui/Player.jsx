'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'

export default function Player({ streams = [] }) {
  const [current, setCurrent] = useState(null)
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (streams.length > 0) setCurrent(streams[0])
  }, [streams])

  useEffect(() => {
    if (!current) return
    
    const load = async () => {
      setLoading(true)
      try {
        if (current.server_id) {
          const data = await api.getStreamServer(current.server_id)
          setUrl(data.embed_url || data.url)
        } else {
          setUrl(current.embed_url || current.url)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [current])

  if (!streams.length) {
    return <div className="aspect-video bg-[#12121A] rounded-xl flex items-center justify-center">No server</div>
  }

  return (
    <div className="space-y-2">
      <div className="aspect-video bg-black rounded-xl overflow-hidden border border-[#1F1F2B]">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-[#3B82F6] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : url ? (
          <iframe src={url} className="w-full h-full" allowFullScreen />
        ) : null}
      </div>
      
      <div className="flex gap-1">
        {streams.map((s, i) => (
          <button
            key={i}
            onClick={() => setCurrent(s)}
            className={`px-3 py-1 text-xs rounded ${
              current?.name === s.name ? 'bg-[#3B82F6]' : 'bg-[#1F1F2B]'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>
    </div>
  )
}
