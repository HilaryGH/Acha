import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import TripsAndOrdersSection from './TripsAndOrdersSection'
import CommunicationWidget from './CommunicationWidget'

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slide data
  const slides = [
    {
      title: 'Fast & Reliable Delivery',
      subtitle: 'Connect with travelers worldwide',
      description: 'Send and receive items through our trusted network of travelers',
      image: '/acha hero.jpg',
      cta: 'Get Started'
    },
    {
      title: 'Acha Delivery',
      subtitle: 'አቻ ደሊቨሪ',
      description: 'Your trusted delivery partner',
      image: '/acha.png',
      cta: 'Get Started',
      isSpecial: true
    },
    {
      title: 'Global Network',
      subtitle: 'Reach anywhere, anytime',
      description: 'Connect with delivery partners across the globe',
      image: '/hero2.png',
      cta: 'Join Now',
      isSVG: true
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="w-full bg-white">
      {/* Hero Section with Sliding Carousel */}
      <section className="relative h-[18vh] min-h-[52px] md:h-[30vh] sm:min-h-[220px] md:min-h-[300px] flex items-center justify-center overflow-hidden bg-gray-100 py-1 md:py-4">
        <div className="w-[95%] max-w-7xl h-full mx-auto relative overflow-hidden">
          {/* Sliding Container */}
          <div 
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ 
              transform: `translateX(-${currentSlide * 100}%)`
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="min-w-full h-full flex-shrink-0 bg-gradient-to-br from-green-600 via-green-500 to-green-700 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden relative"
              >
                {slide.isSpecial ? (
                  /* Special Layout for Second Slide - Two Sections with Green Background */
                  <div className="flex flex-row h-full relative">
                    {/* Green Background with Brand-Aligned Pattern */}
                    <div className="absolute inset-0 z-0 bg-gradient-to-br from-green-600 via-green-500 to-green-700">
                      {/* Subtle pattern overlay for brand alignment */}
                      <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <defs>
                            <pattern id={`greenPattern-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                              <circle cx="10" cy="10" r="1" fill="#ffffff" opacity="0.3"/>
                            </pattern>
                          </defs>
                          <rect width="100" height="100" fill={`url(#greenPattern-${index})`} />
                        </svg>
                      </div>
                      {/* Subtle wave pattern for depth */}
                      <div className="absolute inset-0 opacity-20">
                        <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id={`greenWaveGradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
                              <stop offset="50%" stopColor="#16a34a" stopOpacity="0.2" />
                              <stop offset="100%" stopColor="#15803d" stopOpacity="0.3" />
                            </linearGradient>
                          </defs>
                          <path
                            fill={`url(#greenWaveGradient-${index})`}
                            d="M0,100 Q50,80 100,100 T200,100 L200,200 L0,200 Z"
                          >
                            <animate
                              attributeName="d"
                              values="M0,100 Q50,80 100,100 T200,100 L200,200 L0,200 Z;M0,100 Q50,120 100,100 T200,100 L200,200 L0,200 Z;M0,100 Q50,80 100,100 T200,100 L200,200 L0,200 Z"
                              dur="6s"
                              repeatCount="indefinite"
                            />
                          </path>
                        </svg>
                      </div>
                    </div>

                    {/* Left Side - Content */}
                    <div className="w-1/2 md:w-1/2 flex flex-col justify-center px-3 md:px-6 lg:px-10 xl:px-12 text-white relative z-10 py-2 md:py-0">
                      <div className="animate-fade-in-up">
                        <h2 className="text-lg sm:text-lg md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3 text-white leading-tight">
                          {slide.title}
                        </h2>
                        <h3 className="text-base sm:text-base md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3 text-white leading-tight">
                          {slide.subtitle}
                        </h3>
                        <p className="text-sm sm:text-sm md:text-base lg:text-lg mb-2 md:mb-6 text-white/90 leading-tight">
                          {slide.description}
                        </p>
                      </div>
                    </div>

                    {/* Right Side - Delivery SVG - Bigger Image */}
                    <div className="w-1/2 md:w-1/2 flex items-center justify-center relative">
                      <div className="relative w-full h-full flex items-center justify-center p-2 md:p-0">
                        {/* Animated Delivery SVG - Larger Size */}
                        <div className="relative animate-float w-full h-full overflow-hidden rounded-xl md:rounded-2xl max-h-[150px] sm:max-h-[140px] md:max-h-full" style={{ animationDelay: `${index * 0.2}s` }}>
                          <img
                            src="/Delivery.svg"
                            alt="Delivery"
                            className="w-full h-full object-contain shadow-2xl transform hover:scale-105 transition-transform duration-500 rounded-xl md:rounded-2xl brightness-110"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : slide.isSVG ? (
                  /* SVG Layout for Third Slide */
                  <div className="flex flex-row h-full">
                    {/* Left Side - Content */}
                    <div className="w-1/2 md:w-1/2 flex flex-col justify-center px-3 md:px-6 lg:px-10 xl:px-12 text-white relative z-10 py-2 md:py-0">
                      <div className="animate-fade-in-up">
                        <h2 className="text-base sm:text-lg md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3 text-white leading-tight">
                          {slide.title}
                        </h2>
                        <h3 className="text-sm sm:text-base md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3 text-green-100 leading-tight">
                          {slide.subtitle}
                        </h3>
                        <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-2 md:mb-6 text-white/90 leading-tight">
                          {slide.description}
                        </p>
                        <Link
                          to="/register"
                          className="inline-block bg-white text-green-600 hover:bg-gray-50 px-3 md:px-6 py-1.5 md:py-2.5 rounded-full font-bold text-xs md:text-base transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-105"
                        >
                          {slide.cta}
                        </Link>
                      </div>
                    </div>

                    {/* Right Side - Brand Color SVG (50% width, no padding/margin) */}
                    <div className="w-1/2 md:w-1/2 flex items-center justify-center relative">
                      <div className="relative w-full h-full flex items-center justify-center p-2 md:p-0">
                        {/* Animated SVG - Full width of the 50% container */}
                        <div className="relative animate-float w-full h-full overflow-hidden rounded-xl md:rounded-2xl max-h-[120px] sm:max-h-[140px] md:max-h-full" style={{ animationDelay: `${index * 0.2}s` }}>
                          <svg
                            className="w-full h-full"
                            viewBox="0 0 400 400"
                            preserveAspectRatio="xMidYMid meet"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <defs>
                              {/* Blue to Green Gradient */}
                              <linearGradient id={`blueGreenGradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.9" />
                                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#16a34a" stopOpacity="0.9" />
                              </linearGradient>
                              {/* Green to Blue Gradient */}
                              <linearGradient id={`greenBlueGradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#16a34a" stopOpacity="0.9" />
                                <stop offset="50%" stopColor="#22c55e" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.9" />
                              </linearGradient>
                              {/* Radial Gradient for Glow */}
                              <radialGradient id={`radialGlow-${index}`} cx="50%" cy="50%">
                                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.6" />
                                <stop offset="50%" stopColor="#16a34a" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
                              </radialGradient>
                            </defs>
                            
                            {/* Background Circle with Gradient */}
                            <circle cx="200" cy="200" r="180" fill={`url(#blueGreenGradient-${index})`} opacity="0.3">
                              <animate attributeName="r" values="180;200;180" dur="4s" repeatCount="indefinite" />
                            </circle>
                            
                            {/* Network Nodes - Blue */}
                            <circle cx="100" cy="120" r="12" fill="#2563eb" opacity="0.9">
                              <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="300" cy="120" r="12" fill="#2563eb" opacity="0.9">
                              <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2.5s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="100" cy="280" r="12" fill="#16a34a" opacity="0.9">
                              <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2.2s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="300" cy="280" r="12" fill="#16a34a" opacity="0.9">
                              <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2.8s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="200" cy="80" r="15" fill="#2563eb" opacity="0.95">
                              <animate attributeName="opacity" values="0.95;0.6;0.95" dur="2.3s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="200" cy="320" r="15" fill="#16a34a" opacity="0.95">
                              <animate attributeName="opacity" values="0.95;0.6;0.95" dur="2.7s" repeatCount="indefinite" />
                            </circle>
                            
                            {/* Center Hub - Blended */}
                            <circle cx="200" cy="200" r="25" fill={`url(#blueGreenGradient-${index})`} opacity="0.95">
                              <animate attributeName="r" values="25;30;25" dur="3s" repeatCount="indefinite" />
                            </circle>
                            
                            {/* Connection Lines - Blended Colors */}
                            <line x1="200" y1="200" x2="100" y2="120" stroke={`url(#blueGreenGradient-${index})`} strokeWidth="2" opacity="0.6">
                              <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2s" repeatCount="indefinite" />
                            </line>
                            <line x1="200" y1="200" x2="300" y2="120" stroke={`url(#blueGreenGradient-${index})`} strokeWidth="2" opacity="0.6">
                              <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2.5s" repeatCount="indefinite" />
                            </line>
                            <line x1="200" y1="200" x2="100" y2="280" stroke={`url(#greenBlueGradient-${index})`} strokeWidth="2" opacity="0.6">
                              <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2.2s" repeatCount="indefinite" />
                            </line>
                            <line x1="200" y1="200" x2="300" y2="280" stroke={`url(#greenBlueGradient-${index})`} strokeWidth="2" opacity="0.6">
                              <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2.8s" repeatCount="indefinite" />
                            </line>
                            <line x1="200" y1="200" x2="200" y2="80" stroke={`url(#blueGreenGradient-${index})`} strokeWidth="2" opacity="0.6">
                              <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2.3s" repeatCount="indefinite" />
                            </line>
                            <line x1="200" y1="200" x2="200" y2="320" stroke={`url(#greenBlueGradient-${index})`} strokeWidth="2" opacity="0.6">
                              <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2.7s" repeatCount="indefinite" />
                            </line>
                            
                            {/* Glow Effect */}
                            <circle cx="200" cy="200" r="150" fill={`url(#radialGlow-${index})`} opacity="0.4">
                              <animate attributeName="opacity" values="0.4;0.6;0.4" dur="3s" repeatCount="indefinite" />
                            </circle>
                            
                            {/* Floating Particles */}
                            <circle cx="150" cy="150" r="4" fill="#2563eb" opacity="0.7">
                              <animate attributeName="cy" values="150;140;150" dur="3s" repeatCount="indefinite" />
                              <animate attributeName="opacity" values="0.7;0.3;0.7" dur="3s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="250" cy="250" r="4" fill="#16a34a" opacity="0.7">
                              <animate attributeName="cy" values="250;260;250" dur="3.5s" repeatCount="indefinite" />
                              <animate attributeName="opacity" values="0.7;0.3;0.7" dur="3.5s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="150" cy="250" r="4" fill="#3b82f6" opacity="0.7">
                              <animate attributeName="cx" values="150;160;150" dur="2.8s" repeatCount="indefinite" />
                              <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2.8s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="250" cy="150" r="4" fill="#22c55e" opacity="0.7">
                              <animate attributeName="cx" values="250;240;250" dur="3.2s" repeatCount="indefinite" />
                              <animate attributeName="opacity" values="0.7;0.3;0.7" dur="3.2s" repeatCount="indefinite" />
                            </circle>
                          </svg>
                          {/* Glow effect overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-green-500/20 to-blue-600/20 blur-2xl -z-10 animate-pulse rounded-xl md:rounded-2xl"></div>
                        </div>
                        
                        {/* Decorative elements - hidden on mobile */}
                        <div className="hidden md:block absolute top-8 right-8 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: `${index * 0.3}s` }}></div>
                        <div className="hidden md:block absolute bottom-8 left-8 w-20 h-20 bg-green-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: `${index * 0.4}s` }}></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Regular Layout for Other Slides */
                  <div className={`flex ${index === 0 ? 'md:flex-row flex-col' : 'flex-row'} h-full relative`}>
                    {/* Background Image for First Slide on Mobile */}
                    {index === 0 && (
                      <div className="absolute inset-0 md:hidden z-0">
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-full object-cover"
                        />
                        {/* Dark overlay for better text readability */}
                        <div className="absolute inset-0 bg-black/40"></div>
                      </div>
                    )}
                    
                    {/* Left Side - Content */}
                    <div className={`${index === 0 ? 'w-full md:w-1/2' : 'w-1/2 md:w-1/2'} flex flex-col justify-center ${index === 0 ? 'px-4 md:px-6 lg:px-10 xl:px-12 md:px-6' : 'px-1.5 md:px-6 lg:px-10 xl:px-12'} text-white relative z-10 ${index === 0 ? 'py-2 md:py-0' : 'py-0.5 md:py-0'}`}>
                      <div className="animate-fade-in-up">
                        <h2 className={`${index === 0 ? 'text-base sm:text-lg md:text-3xl lg:text-4xl' : 'text-[11px] sm:text-sm md:text-3xl lg:text-4xl'} font-bold ${index === 0 ? 'mb-2 md:mb-3' : 'mb-0 md:mb-3'} text-white ${index === 0 ? 'leading-normal' : 'leading-[1.2]'}`}>
                          {slide.title}
                        </h2>
                        {/* Show subtitle for first slide on mobile and desktop */}
                        {(index === 0 ? (
                          <h3 className="text-sm sm:text-base md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3 text-green-100 leading-normal">
                            {slide.subtitle}
                          </h3>
                        ) : (
                          <h3 className="text-[10px] sm:text-xs md:text-xl lg:text-2xl font-semibold mb-0 md:mb-3 text-green-100 leading-[1.2]">
                            {slide.subtitle}
                          </h3>
                        ))}
                        {/* Show description for first slide on mobile and desktop */}
                        {(index === 0 ? (
                          <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-3 md:mb-4 text-white/90 leading-relaxed">
                            {slide.description}
                          </p>
                        ) : (
                          <p className="text-[9px] sm:text-[10px] md:text-base lg:text-lg mb-0.5 md:mb-6 text-white/90 leading-[1.2]">
                            {slide.description}
                          </p>
                        ))}
                        <Link
                          to="/register"
                          className={`inline-block bg-white text-green-600 hover:bg-gray-50 ${index === 0 ? 'px-4 md:px-6 py-2 md:py-2.5 text-sm md:text-base' : 'px-1.5 md:px-6 py-0.5 md:py-2.5 text-[9px] md:text-base'} rounded-full font-bold transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-105`}
                        >
                          {slide.cta}
                        </Link>
                      </div>
                    </div>

                    {/* Right Side - Image with Animation (50% width, no padding/margin) */}
                    {index !== 0 && (
                      <div className="w-1/2 md:w-1/2 flex items-center justify-center relative">
                        <div className="relative w-full h-full flex items-center justify-center p-0 md:p-0">
                          {/* Animated Image - Full width of the 50% container */}
                          <div className="relative animate-float w-full h-full overflow-hidden rounded-xl md:rounded-2xl" style={{ animationDelay: `${index * 0.2}s` }}>
                            <img
                              src={slide.image}
                              alt={slide.title}
                              className="w-full h-full object-contain shadow-2xl transform hover:scale-105 transition-transform duration-500 rounded-xl md:rounded-2xl max-h-[50px] sm:max-h-[70px] md:max-h-full"
                            />
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-green-400/20 blur-2xl -z-10 animate-pulse rounded-xl md:rounded-2xl"></div>
                          </div>
                          
                          {/* Decorative elements - hidden on mobile */}
                          <div className="hidden md:block absolute top-8 right-8 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: `${index * 0.3}s` }}></div>
                          <div className="hidden md:block absolute bottom-8 left-8 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: `${index * 0.4}s` }}></div>
                        </div>
                      </div>
                    )}
                    
                    {/* Image for First Slide on Desktop - Exactly Half Width */}
                    {index === 0 && (
                      <div className="hidden md:flex w-1/2 items-center justify-center relative">
                        <div className="relative w-full h-full flex items-center justify-center p-0">
                          {/* Animated Image - Full width of the 50% container */}
                          <div className="relative animate-float w-full h-full overflow-hidden rounded-xl md:rounded-2xl" style={{ animationDelay: `${index * 0.2}s` }}>
                            <img
                              src={slide.image}
                              alt={slide.title}
                              className="w-full h-full object-cover shadow-2xl transform hover:scale-105 transition-transform duration-500 rounded-xl md:rounded-2xl"
                            />
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-green-400/20 blur-2xl -z-10 animate-pulse rounded-xl md:rounded-2xl"></div>
                          </div>
                          
                          {/* Decorative elements */}
                          <div className="hidden md:block absolute top-8 right-8 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: `${index * 0.3}s` }}></div>
                          <div className="hidden md:block absolute bottom-8 left-8 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: `${index * 0.4}s` }}></div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
                </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 md:h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'bg-white w-6 md:w-8'
                    : 'bg-white/50 w-2 md:w-3 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
                  </div>
                </div>
      </section>

      {/* Catalogue Section - Compact */}
      <section className="relative py-6 md:py-8 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Service Cards Grid - Compact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Delivery Partners */}
            <div 
              className="relative shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1 rounded-2xl h-32 md:h-48 flex flex-row md:flex-col"
              style={{ borderRadius: '0 2rem 0 2rem' }}
            >
              {/* Background Image - Right side on mobile */}
              <div className="w-1/2 md:w-full md:absolute md:inset-0">
                <img 
                  src="/Delivery partners.png" 
                  alt="Delivery Partners"
                  className="w-full h-full object-cover"
                  style={{ borderRadius: '0 2rem 0 2rem' }}
                />
              </div>
              
              {/* Icon at top of card */}
              <div className="absolute top-0 left-0 w-12 h-12 md:w-20 md:h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 z-20" style={{ borderRadius: '0 2rem 0 2rem', backgroundColor: '#2563eb' }}>
                <svg className="w-6 h-6 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              
              {/* Content - Left side on mobile, bottom on desktop */}
              <div className="w-1/2 md:w-full md:absolute md:bottom-0 flex flex-col justify-center md:justify-end px-3 py-3 md:px-4 md:py-5 z-10 bg-white md:bg-transparent md:bg-gradient-to-b md:from-transparent md:via-black/10 md:to-black/30 relative" style={{ borderRadius: '0 0 0 2rem' }}>
                <h3 className="text-xs md:text-base font-bold text-green-600 md:text-white md:drop-shadow-lg mb-1 md:mb-1.5 relative z-10">
                  Delivery Partners
                </h3>
                <p className="text-[10px] md:text-xs text-gray-700 md:text-white md:drop-shadow-md leading-tight md:leading-relaxed relative z-10">
                  Professional delivery partners ready to serve you
                </p>
              </div>
            </div>

            {/* Acha Sisters Delivery Partner */}
            <div 
              className="relative shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1 rounded-2xl h-32 md:h-48 flex flex-row md:flex-col"
              style={{ borderRadius: '0 2rem 0 2rem' }}
            >
              {/* Background Image - Right side on mobile */}
              <div className="w-1/2 md:w-full md:absolute md:inset-0">
                <img 
                  src="/Acha Sisters Delivery Partner.png" 
                  alt="Acha Sisters Delivery Partner"
                  className="w-full h-full object-cover"
                  style={{ borderRadius: '0 2rem 0 2rem' }}
                />
              </div>
              
              {/* Icon at top of card */}
              <div className="absolute top-0 left-0 w-12 h-12 md:w-20 md:h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 z-20" style={{ borderRadius: '0 2rem 0 2rem', backgroundColor: '#2563eb' }}>
                <svg className="w-6 h-6 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              
              {/* Content - Left side on mobile, bottom on desktop */}
              <div className="w-1/2 md:w-full md:absolute md:bottom-0 flex flex-col justify-center md:justify-end px-3 py-3 md:px-4 md:py-5 z-10 bg-white md:bg-transparent md:bg-gradient-to-b md:from-transparent md:via-black/10 md:to-black/30 relative" style={{ borderRadius: '0 0 0 2rem' }}>
                <h3 className="text-xs md:text-base font-bold text-green-600 md:text-white md:drop-shadow-lg mb-1 md:mb-1.5 relative z-10">
                  Acha Sisters Delivery Partner
                </h3>
                <p className="text-[10px] md:text-xs text-gray-700 md:text-white md:drop-shadow-md leading-tight md:leading-relaxed relative z-10">
                  Empowering women in delivery services
                </p>
              </div>
            </div>
            
            {/* Acha Surprise Gift */}
            <div 
              className="relative shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1 rounded-2xl h-32 md:h-48 flex flex-row md:flex-col"
              style={{ borderRadius: '0 2rem 0 2rem' }}
            >
              {/* Background Image - Right side on mobile */}
              <div className="w-1/2 md:w-full md:absolute md:inset-0">
                <img 
                  src="/Acha Surprise Gift.png" 
                  alt="Acha Surprise Gift"
                  className="w-full h-full object-cover"
                  style={{ borderRadius: '0 2rem 0 2rem' }}
                />
              </div>
              
              {/* Icon at top of card */}
              <div className="absolute top-0 left-0 w-12 h-12 md:w-20 md:h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 z-20" style={{ borderRadius: '0 2rem 0 2rem', backgroundColor: '#2563eb' }}>
                <svg className="w-6 h-6 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              
              {/* Content - Left side on mobile, bottom on desktop */}
              <div className="w-1/2 md:w-full md:absolute md:bottom-0 flex flex-col justify-center md:justify-end px-3 py-3 md:px-4 md:py-5 z-10 bg-white md:bg-transparent md:bg-gradient-to-b md:from-transparent md:via-black/10 md:to-black/30 relative" style={{ borderRadius: '0 0 0 2rem' }}>
                <h3 className="text-xs md:text-base font-bold text-green-600 md:text-white md:drop-shadow-lg mb-1 md:mb-1.5 relative z-10">
                  Acha Surprise Gift
                </h3>
                <p className="text-[10px] md:text-xs text-gray-700 md:text-white md:drop-shadow-md leading-tight md:leading-relaxed relative z-10">
                  Gift Products, Gift Packages, Gift Bundles - Beautifully curated gifts for every occasion
                </p>
              </div>
            </div>

            {/* Acha Movers & Packers */}
            <div 
              className="relative shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1 rounded-2xl h-32 md:h-48 flex flex-row md:flex-col"
              style={{ borderRadius: '0 2rem 0 2rem' }}
            >
              {/* Background Image - Right side on mobile */}
              <div className="w-1/2 md:w-full md:absolute md:inset-0">
                <img 
                  src="/Acha Movers & Packers.png" 
                  alt="Acha Movers & Packers"
                  className="w-full h-full object-cover"
                  style={{ borderRadius: '0 2rem 0 2rem' }}
                />
              </div>
              
              {/* Icon at top of card */}
              <div className="absolute top-0 left-0 w-12 h-12 md:w-20 md:h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 z-20" style={{ borderRadius: '0 2rem 0 2rem', backgroundColor: '#2563eb' }}>
                <svg className="w-6 h-6 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>

              {/* Content - Left side on mobile, bottom on desktop */}
              <div className="w-1/2 md:w-full md:absolute md:bottom-0 flex flex-col justify-center md:justify-end px-3 py-3 md:px-4 md:py-5 z-10 bg-white md:bg-transparent md:bg-gradient-to-b md:from-transparent md:via-black/10 md:to-black/30 relative" style={{ borderRadius: '0 0 0 2rem' }}>
                <h3 className="text-xs md:text-base font-bold text-green-600 md:text-white md:drop-shadow-lg mb-1 md:mb-1.5 relative z-10">
                  Acha Movers & Packers
              </h3>
                <p className="text-[10px] md:text-xs text-gray-700 md:text-white md:drop-shadow-md leading-tight md:leading-relaxed relative z-10">
                  Professional moving and packing services
                  </p>
              </div>
            </div>
                </div>
              </div>
      </section>

      {/* Trips and Orders Section */}
      <TripsAndOrdersSection />

      {/* Partner With Us, Women Initiatives & Premium Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 xl:px-12 bg-gradient-to-br from-gray-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Partner With Us */}
            <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl text-center transition-all duration-500 hover:-translate-y-4 hover:scale-105 border border-gray-100 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                🤝
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                Partner With Us
              </h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Invest / Partner With Us - Join us in revolutionizing the delivery and travel industry
              </p>
              <Link 
                to="/partner-with-us"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                  Join In
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
              </Link>
            </div>

            {/* Women Initiatives */}
            <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl text-center transition-all duration-500 hover:-translate-y-4 hover:scale-105 border border-gray-100 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                👩
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                Women Initiatives
              </h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Join Women Initiatives - Empower yourself and join our community of amazing women
              </p>
              <Link 
                to="/women-initiatives"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                  Join In
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
              </Link>
            </div>

            {/* Premium Community */}
            <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl text-center transition-all duration-500 hover:-translate-y-4 hover:scale-105 border border-gray-100 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                ⭐
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                Acha Premium Community
              </h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Join our premium community - Exclusive benefits for delivery partners and corporate clients
              </p>
              <Link 
                to="/premium"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                  Join In
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Beautiful Compact Info Section - Before Footer */}
      <section className="relative py-8 md:py-12 px-4 sm:px-6 lg:px-8 xl:px-12 bg-gradient-to-br from-white via-green-50/30 to-gray-50 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-200/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-300/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Compact Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            
            {/* How It Works - Beautiful Card */}
            <div className="group relative bg-gradient-to-br from-white to-green-50/50 p-5 md:p-6 border border-green-100/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden" style={{ borderRadius: '0 5rem 0 5rem' }}>
              {/* Decorative Gradient Overlay */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    ✈️
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-green-600 group-hover:text-green-700 transition-colors">
                    How It Works
                  </h3>
                </div>
                
                <p className="text-xs md:text-sm text-gray-600 mb-4 leading-relaxed">
                  Connect with travelers and delivery partners to send and receive items safely and efficiently
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-2 rounded-lg bg-white/60 hover:bg-white transition-colors group/item">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-sm flex-shrink-0 shadow-md group-hover/item:scale-110 transition-transform">
                      ✈️
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-gray-800 mb-0.5">Post Your Trip</p>
                      <p className="text-xs text-gray-600 leading-relaxed">Share your travel date and destination</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-2 rounded-lg bg-white/60 hover:bg-white transition-colors group/item">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-sm flex-shrink-0 shadow-md group-hover/item:scale-110 transition-transform">
                      📦
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-gray-800 mb-0.5">Find Travelers</p>
                      <p className="text-xs text-gray-600 leading-relaxed">Search for travelers going to your destination</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-2 rounded-lg bg-white/60 hover:bg-white transition-colors group/item">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-sm flex-shrink-0 shadow-md group-hover/item:scale-110 transition-transform">
                      🤝
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-gray-800 mb-0.5">Connect & Deliver</p>
                      <p className="text-xs text-gray-600 leading-relaxed">Coordinate pickup and delivery</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Acha - Beautiful Card */}
            <div className="group relative bg-gradient-to-br from-white to-green-50/50 p-5 md:p-6 border border-green-100/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden" style={{ borderRadius: '0 5rem 0 5rem' }}>
              {/* Decorative Gradient Overlay */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 overflow-hidden">
                    <img src="/acha.png" alt="Acha Logo" className="h-6 w-auto object-contain" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-green-600 group-hover:text-green-700 transition-colors">
                    Why Choose Acha?
                  </h3>
                </div>
                
                <p className="text-xs md:text-sm text-gray-600 mb-4 leading-relaxed">
                  Experience the benefits of peer-to-peer delivery
                </p>
                
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-100/50 border border-yellow-200/50 hover:shadow-md transition-all group/item">
                    <div className="text-lg mb-1">💰</div>
                    <p className="text-xs font-bold text-gray-800 mb-0.5">Cost Effective</p>
                    <p className="text-xs text-gray-600">Save money</p>
                  </div>
                  
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-200/50 hover:shadow-md transition-all group/item">
                    <div className="text-lg mb-1">⚡</div>
                    <p className="text-xs font-bold text-gray-800 mb-0.5">Fast Delivery</p>
                    <p className="text-xs text-gray-600">Quick delivery</p>
                  </div>
                  
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/50 hover:shadow-md transition-all group/item">
                    <div className="text-lg mb-1">🔒</div>
                    <p className="text-xs font-bold text-gray-800 mb-0.5">Secure & Safe</p>
                    <p className="text-xs text-gray-600">Trusted travelers</p>
                  </div>
                  
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200/50 hover:shadow-md transition-all group/item">
                    <div className="text-lg mb-1">🌍</div>
                    <p className="text-xs font-bold text-gray-800 mb-0.5">Global Network</p>
                    <p className="text-xs text-gray-600">Worldwide reach</p>
                  </div>
                </div>
              </div>
            </div>

            {/* About Us - Beautiful Card */}
            <div className="group relative bg-gradient-to-br from-white to-green-50/50 p-5 md:p-6 border border-green-100/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden" style={{ borderRadius: '0 5rem 0 5rem' }}>
              {/* Decorative Gradient Overlay */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    ℹ️
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-green-600 group-hover:text-green-700 transition-colors">
                    About Us
                  </h3>
        </div>

                <p className="text-xs md:text-sm text-gray-700 mb-3 leading-relaxed">
                  <span className="font-bold text-green-600">Acha Delivery</span> is a peer-to-peer delivery and local delivery partner marketplace platform headquartered in <span className="font-semibold text-gray-800">Addis Ababa, Ethiopia</span>.
                </p>
                
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  As a peer-to-peer marketplace, it links international and domestic travelers (acting as carriers) with buyers, senders, and recipients. Additionally, Acha Delivery serves as a delivery partner marketplace, connecting clients with verified local delivery partners.
                </p>
                
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white text-xs font-semibold rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                >
                  <span>Read More About Us</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
            </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Communication Widget - Fixed at bottom right */}
      <CommunicationWidget />
    </div>
  );
}

export default Home;
