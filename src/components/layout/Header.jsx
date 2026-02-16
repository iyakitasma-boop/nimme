'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  const menu = [
    { name: 'Populer', href: '/populer' },
    { name: 'Movie', href: '/movie' },
    { name: 'Genre', href: '/genre' },
    { name: 'Schedule', href: '/anime/schedule' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0B0F]/80 backdrop-blur-md border-b border-[#1F1F2B]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            Ditz<span className="text-[#3B82F6]">nime</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {menu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-sm rounded-lg transition ${
                  pathname === item.href
                    ? 'bg-[#1F1F2B] text-white'
                    : 'text-gray-400 hover:text-white hover:bg-[#1F1F2B]/50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
