'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { 
  FaSearch, 
  FaBell, 
  FaUser, 
  FaBars, 
  FaTimes,
  FaFire,
  FaHome,
  FaCalendarAlt,
  FaList,
  FaInfinity
} from 'react-icons/fa'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/', label: 'Home', icon: FaHome },
    { href: '/anime/ongoing', label: 'Ongoing', icon: FaFire },
    { href: '/anime/complete', label: 'Complete', icon: FaList },
    { href: '/anime/schedule', label: 'Jadwal', icon: FaCalendarAlt },
    { href: '/unlimited', label: 'Semua', icon: FaInfinity },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative group">
            <h1 className="text-3xl font-black">
              <span className="text-gradient">Ditz</span>
              <span className="text-white">nime</span>
            </h1>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-full transition-all duration-300 group ${
                    isActive 
                      ? 'text-white bg-primary/20' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <item.icon className={`text-sm ${isActive ? 'text-primary' : ''}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="relative p-2 hover:bg-white/5 rounded-full transition group"
            >
              <FaSearch className="text-xl text-gray-300 group-hover:text-primary transition" />
              <div className="absolute inset-0 rounded-full border border-primary/0 group-hover:border-primary/20 transition-all duration-300"></div>
            </button>

            {/* Notification */}
            <button className="relative p-2 hover:bg-white/5 rounded-full transition hidden md:block">
              <FaBell className="text-xl text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
            </button>

            {/* Profile */}
            <button className="hidden md:flex items-center gap-2 px-3 py-2 bg-primary/10 hover:bg-primary/20 rounded-full transition">
              <div className="w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
              <span className="text-sm font-medium">Guest</span>
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 hover:bg-white/5 rounded-full transition"
            >
              {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className={`overflow-hidden transition-all duration-300 ${
          searchOpen ? 'max-h-20 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <form className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari anime favoritmu..."
              className="w-full bg-card/50 backdrop-blur-md text-white px-6 py-4 rounded-2xl border border-white/10 focus:border-primary/50 focus:outline-none transition"
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-medium hover:shadow-lg hover:shadow-primary/20 transition"
            >
              Cari
            </button>
          </form>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="glass rounded-2xl p-4">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                      isActive ? 'bg-primary/20 text-primary' : 'hover:bg-white/5'
                    }`}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
    }
