import Link from 'next/link'
import { 
  FaGithub, 
  FaTwitter, 
  FaDiscord, 
  FaInstagram,
  FaYoutube,
  FaHeart,
  FaArrowUp
} from 'react-icons/fa'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-darker border-t border-white/5 mt-auto">
      {/* Wave Effect */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-darker"></div>

      <div className="container mx-auto px-4 py-12">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-gradient">Ditz</span>nime
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Platform streaming anime gratis dengan koleksi terlengkap. 
              Update setiap hari dengan kualitas terbaik dan server stabil.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-primary/20 rounded-full flex items-center justify-center transition group">
                <FaGithub className="text-gray-400 group-hover:text-primary" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-primary/20 rounded-full flex items-center justify-center transition group">
                <FaTwitter className="text-gray-400 group-hover:text-primary" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-primary/20 rounded-full flex items-center justify-center transition group">
                <FaDiscord className="text-gray-400 group-hover:text-primary" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-primary/20 rounded-full flex items-center justify-center transition group">
                <FaInstagram className="text-gray-400 group-hover:text-primary" />
              </a>
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2">
              {['Home', 'Ongoing', 'Complete', 'Genre', 'Jadwal', 'Semua Anime'].map((item, i) => (
                <li key={i}>
                  <Link 
                    href={i === 0 ? '/' : `/anime/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-primary transition flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bantuan */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Bantuan</h4>
            <ul className="space-y-2">
              {['FAQ', 'Kontak', 'Syarat & Ketentuan', 'Privacy Policy', 'DMCA', 'Disclaimer'].map((item, i) => (
                <li key={i}>
                  <Link 
                    href={`/${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                    className="text-gray-400 hover:text-primary transition flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Statistik</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Anime</span>
                <span className="font-bold text-gradient">1,234</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Episode</span>
                <span className="font-bold text-gradient">5,678</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">User Online</span>
                <span className="font-bold text-green-400">10.2K</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Update Hari Ini</span>
                <span className="font-bold text-yellow-400">12</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400 flex items-center gap-1">
            © 2024 Ditznime. Dibuat dengan 
            <FaHeart className="text-red-500 animate-pulse" /> 
            oleh Ditzz
          </p>
          
          <div className="flex items-center gap-4 text-sm">
            <Link href="/terms" className="text-gray-400 hover:text-primary transition">Terms</Link>
            <Link href="/privacy" className="text-gray-400 hover:text-primary transition">Privacy</Link>
            <Link href="/cookies" className="text-gray-400 hover:text-primary transition">Cookies</Link>
          </div>

          {/* Back to Top */}
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-gray-400 hover:text-primary transition"
          >
            <span>Back to Top</span>
            <FaArrowUp className="group-hover:-translate-y-1 transition" />
          </button>
        </div>
      </div>
    </footer>
  )
}
