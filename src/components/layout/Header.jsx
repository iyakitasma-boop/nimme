'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/anime/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-darker/95 backdrop-blur-md z-50 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-500">
            Ditz<span className="text-white">nime</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-blue-400 transition">Home</Link>
            <Link href="/anime/ongoing" className="hover:text-blue-400 transition">Ongoing</Link>
            <Link href="/anime/complete" className="hover:text-blue-400 transition">Complete</Link>
            <Link href="/anime/schedule" className="hover:text-blue-400 transition">Jadwal</Link>
            <Link href="/genre" className="hover:text-blue-400 transition">Genre</Link>
            <Link href="/unlimited" className="hover:text-blue-400 transition">Semua Anime</Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:bg-gray-800 rounded-full transition"
            >
              <FaSearch className="text-xl" />
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 hover:bg-gray-800 rounded-full transition"
            >
              {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <form onSubmit={handleSearch} className="py-4 border-t border-gray-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari anime..."
                className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <button 
                type="submit"
                className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Cari
              </button>
            </div>
          </form>
        )}

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-3">
              <Link href="/" className="hover:text-blue-400 transition py-2" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link href="/anime/ongoing" className="hover:text-blue-400 transition py-2" onClick={() => setMenuOpen(false)}>Ongoing</Link>
              <Link href="/anime/complete" className="hover:text-blue-400 transition py-2" onClick={() => setMenuOpen(false)}>Complete</Link>
              <Link href="/anime/schedule" className="hover:text-blue-400 transition py-2" onClick={() => setMenuOpen(false)}>Jadwal</Link>
              <Link href="/genre" className="hover:text-blue-400 transition py-2" onClick={() => setMenuOpen(false)}>Genre</Link>
              <Link href="/unlimited" className="hover:text-blue-400 transition py-2" onClick={() => setMenuOpen(false)}>Semua Anime</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}