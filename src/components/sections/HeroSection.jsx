'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaPlay, FaInfoCircle, FaChevronDown } from 'react-icons/fa'

export default function HeroSection({ gifSrc, title, description }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background dengan efek parallax */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-transparent to-dark z-10"></div>
        <img
          src={gifSrc}
          alt="Hero"
          className="w-full h-full object-cover scale-105 animate-float"
        />
        
        {/* Animated Overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-primary/20 to-transparent"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
        <div className={`max-w-3xl transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Live • 10.2K watching</span>
          </div>

          {/* Title dengan efek glitch */}
          <h1 className="text-5xl md:text-7xl font-black mb-4 relative">
            <span className="text-gradient">{title}</span>
            <span className="absolute -top-2 -right-2 text-xs bg-primary/20 px-2 py-1 rounded-full">HD</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-4 mb-8">
            {['Sub Indo', 'HD Quality', 'Update Daily', 'Fast Server'].map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-1 h-1 bg-primary rounded-full"></div>
                {feature}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/anime/ongoing"
              className="group relative px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-full font-bold text-lg overflow-hidden transition-transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                <FaPlay className="text-sm" />
                Mulai Nonton
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </Link>
            
            <Link
              href="#trending"
              className="group px-8 py-4 bg-white/10 backdrop-blur-md rounded-full font-bold text-lg border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <FaInfoCircle />
              Trending
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block">
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <span className="text-sm">Scroll Down</span>
              <FaChevronDown className="animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent z-10"></div>
    </section>
  )
          }
