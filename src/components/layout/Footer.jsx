import Link from 'next/link'
import { FaGithub, FaTwitter, FaDiscord } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-darker border-t border-gray-800 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Ditznime</h3>
            <p className="text-gray-400 text-sm">
              Platform streaming anime gratis dengan koleksi terlengkap. Update setiap hari dengan kualitas terbaik.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-blue-400">Home</Link></li>
              <li><Link href="/anime/ongoing" className="hover:text-blue-400">Ongoing</Link></li>
              <li><Link href="/anime/complete" className="hover:text-blue-400">Complete</Link></li>
              <li><Link href="/genre" className="hover:text-blue-400">Genre</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold mb-4">Bantuan</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/faq" className="hover:text-blue-400">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400">Kontak</Link></li>
              <li><Link href="/terms" className="hover:text-blue-400">Syarat & Ketentuan</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-400">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Ikuti Kami</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 text-2xl">
                <FaGithub />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-2xl">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-2xl">
                <FaDiscord />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2026 Ditznime. Dibuat dengan ❤️ oleh Ditzz. Hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}