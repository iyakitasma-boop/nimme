'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaHome, FaFire, FaCheckCircle, FaCalendarAlt, FaBars } from 'react-icons/fa'

export default function MobileNav() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', icon: FaHome, label: 'Home' },
    { href: '/anime/ongoing', icon: FaFire, label: 'Ongoing' },
    { href: '/anime/complete', icon: FaCheckCircle, label: 'Complete' },
    { href: '/anime/schedule', icon: FaCalendarAlt, label: 'Jadwal' },
    { href: '/genre', icon: FaBars, label: 'Genre' },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-darker border-t border-gray-800 z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full ${
                isActive ? 'text-blue-500' : 'text-gray-400 hover:text-blue-400'
              }`}
            >
              <item.icon className="text-xl" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}