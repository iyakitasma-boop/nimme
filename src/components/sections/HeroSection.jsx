import Image from 'next/image'

export default function HeroSection({ gifSrc, title, description }) {
  return (
    <section className="relative w-full h-0 pb-[56.25%] bg-black overflow-hidden">
      {/* Background GIF/Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={gifSrc}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-pulse-slow">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#popular" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition transform hover:scale-105"
            >
              Mulai Nonton
            </a>
            <a 
              href="/anime/ongoing" 
              className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-full font-semibold transition transform hover:scale-105"
            >
              Lihat Ongoing
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}