import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-[#1F1F2B] mt-12">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © 2024 Ditznime. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4 text-sm">
            <Link href="/about" className="text-gray-400 hover:text-[#3B82F6] transition">
              About
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-[#3B82F6] transition">
              Contact
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-[#3B82F6] transition">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
