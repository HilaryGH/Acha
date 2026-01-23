import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import TripsAndOrdersSection from './TripsAndOrdersSection'

function Home() {
  const { t } = useTranslation();
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
      cta: 'Join Now'
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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="w-full bg-white">
      {/* Hero Section with Sliding Carousel */}
      <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden bg-gray-100 py-4">
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
                  /* Special Layout for Second Slide - Three Sections */
                  <div className="flex flex-col md:flex-row h-full">
                    {/* First Section - Content with Amharic */}
                    <div className="w-full md:w-1/3 flex flex-col justify-center px-4 md:px-6 text-white relative z-10 py-4 md:py-0">
                      <div className="animate-fade-in-up">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-white animate-slide-in-left">
                          {slide.title}
                        </h2>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 animate-fade-in-up" style={{ animationDelay: '0.3s', color: '#2563eb' }}>
                          {slide.subtitle}
                        </h3>
                        <p className="text-sm md:text-base mb-4 text-white/90 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                          {slide.description}
                        </p>
                      </div>
                    </div>

                    {/* Second Section - Wave with Green */}
                    <div className="w-full md:w-1/3 flex items-center justify-center relative overflow-hidden min-h-[150px] md:min-h-0">
                      {/* Animated Wave Background */}
                      <div className="absolute inset-0">
                        <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id={`waveGradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
                              <stop offset="50%" stopColor="#16a34a" stopOpacity="0.9" />
                              <stop offset="100%" stopColor="#15803d" stopOpacity="0.8" />
                            </linearGradient>
                          </defs>
                          <path
                            fill={`url(#waveGradient-${index})`}
                            d="M0,100 Q50,50 100,100 T200,100 L200,200 L0,200 Z"
                          >
                            <animate
                              attributeName="d"
                              values="M0,100 Q50,50 100,100 T200,100 L200,200 L0,200 Z;M0,100 Q50,150 100,100 T200,100 L200,200 L0,200 Z;M0,100 Q50,50 100,100 T200,100 L200,200 L0,200 Z"
                              dur="3s"
                              repeatCount="indefinite"
                            />
                          </path>
                        </svg>
                      </div>
                      {/* Content in Wave Section */}
                      <div className="relative z-10 text-center animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                        <div className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto animate-float">
                          <img src="/acha.png" alt="Acha Logo" className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain" />
                        </div>
                      </div>
                    </div>

                    {/* Third Section - Buttons */}
                    <div className="w-full md:w-1/3 flex flex-col justify-center items-center px-4 md:px-6 gap-3 md:gap-4 py-4 md:py-0">
                      <Link
                        to="/register"
                        className="w-full bg-white text-green-600 hover:bg-gray-50 px-6 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-105 animate-fade-in-up"
                        style={{ animationDelay: '0.9s' }}
                      >
                        Get Started
                      </Link>
                      <Link
                        to="/about"
                        className="w-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border-2 border-white/50 px-6 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 shadow-lg hover:-translate-y-1 hover:scale-105 animate-fade-in-up"
                        style={{ animationDelay: '1.1s' }}
                      >
                        Learn More
                      </Link>
                      <Link
                        to="/post-trip"
                        className="w-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border-2 border-white/50 px-6 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 shadow-lg hover:-translate-y-1 hover:scale-105 animate-fade-in-up"
                        style={{ animationDelay: '1.3s' }}
                      >
                        Post Trip
                      </Link>
                    </div>
                  </div>
                ) : (
                  /* Regular Layout for Other Slides */
                  <div className="flex flex-col md:flex-row h-full">
                    {/* Left Side - Content */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center px-5 md:px-6 lg:px-10 xl:px-12 text-white relative z-10 py-4 md:py-0">
                      <div className="animate-fade-in-up">
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3 text-white">
                          {slide.title}
                        </h2>
                        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3 text-green-100">
                          {slide.subtitle}
                        </h3>
                        <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-4 md:mb-6 text-white/90 leading-relaxed">
                          {slide.description}
                        </p>
                        <Link
                          to="/register"
                          className="inline-block bg-white text-green-600 hover:bg-gray-50 px-5 md:px-6 py-2 md:py-2.5 rounded-full font-bold text-sm md:text-base transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-105"
                        >
                          {slide.cta}
                        </Link>
                      </div>
                    </div>

                    {/* Right Side - Image with Animation */}
                    <div className="w-full md:w-1/2 flex items-center justify-center p-3 md:p-6 relative">
                      <div className="relative w-full h-full flex items-center justify-center">
                        {/* Animated Image */}
                        <div className="relative animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                          <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-auto max-h-[180px] sm:max-h-[220px] md:max-h-[260px] lg:max-h-[300px] object-contain rounded-xl md:rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                          />
                          {/* Glow effect */}
                          <div className="absolute inset-0 bg-green-400/20 rounded-xl md:rounded-2xl blur-2xl -z-10 animate-pulse"></div>
                        </div>
                        
                        {/* Decorative elements - hidden on mobile */}
                        <div className="hidden md:block absolute top-8 right-8 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: `${index * 0.3}s` }}></div>
                        <div className="hidden md:block absolute bottom-8 left-8 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: `${index * 0.4}s` }}></div>
                  </div>
                </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-green-600 p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-20"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-green-600 p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-20"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

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
            <div className="bg-white rounded-r-full shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden group hover:-translate-y-1 flex">
              <div className="w-16 flex-shrink-0 bg-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                  </div>
              <div className="flex-1 p-4 flex flex-col justify-center bg-green-50/30">
                <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                  Delivery Partners
                </h3>
                <p className="text-xs text-gray-600 mb-2">
                  Professional delivery partners ready to serve you
                </p>
                <Link
                  to="/catalogue?type=delivery-partners"
                  className="text-green-600 hover:text-green-700 font-semibold text-xs flex items-center gap-1"
                >
                  View More
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                </div>
              </div>

            {/* Acha Sisters Delivery Partner */}
            <div className="bg-white rounded-r-full shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden group hover:-translate-y-1 flex">
              <div className="w-16 flex-shrink-0 bg-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="flex-1 p-4 flex flex-col justify-center bg-green-50/30">
                <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                  Acha Sisters Delivery Partner
                </h3>
                <p className="text-xs text-gray-600 mb-2">
                  Empowering women in delivery services
                </p>
                <Link 
                  to="/catalogue?type=acha-sisters"
                  className="text-green-600 hover:text-green-700 font-semibold text-xs flex items-center gap-1"
                >
                  View More
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
              </div>
            </div>
            
            {/* Acha Surprise Gift */}
            <div className="bg-white rounded-r-full shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden group hover:-translate-y-1 flex">
              <div className="w-16 flex-shrink-0 bg-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <div className="flex-1 p-4 flex flex-col justify-center bg-green-50/30">
                <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                  Acha Surprise Gift
                </h3>
                <p className="text-xs text-gray-600 mb-2">
                  Gift Products, Gift Packages, Gift Bundles - Beautifully curated gifts for every occasion
                </p>
                <Link
                  to="/catalogue?type=surprise-gift"
                  className="text-green-600 hover:text-green-700 font-semibold text-xs flex items-center gap-1"
                >
                  View More
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Acha Movers & Packers */}
            <div className="bg-white rounded-r-full shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden group hover:-translate-y-1 flex">
              <div className="w-16 flex-shrink-0 bg-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="flex-1 p-4 flex flex-col justify-center bg-green-50/30">
                <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                  Acha Movers & Packers
                </h3>
                <p className="text-xs text-gray-600 mb-2">
                  Professional moving and packing services
                </p>
                <Link
                  to="/catalogue?type=movers-packers"
                  className="text-green-600 hover:text-green-700 font-semibold text-xs flex items-center gap-1"
                >
                  View More
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with travelers and delivery partners to send and receive items safely and efficiently
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {/* Feature Card 1 - Post Your Trip */}
            <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-4 hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                {/* Icon Container */}
              <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center text-4xl shadow-lg group-hover:shadow-green-500/50">
                  ✈️
                  </div>
                </div>

                {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                {t('home.features.postTrip.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('home.features.postTrip.description')}
              </p>
            </div>

            {/* Feature Card 2 - Find Travelers */}
            <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-4 hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {/* Icon Container */}
              <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center text-4xl shadow-lg group-hover:shadow-green-500/50">
                  📦
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                {t('home.features.findTravelers.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('home.features.findTravelers.description')}
              </p>
            </div>

            {/* Feature Card 3 - Connect & Deliver */}
            <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-4 hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              {/* Icon Container */}
              <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center text-4xl shadow-lg group-hover:shadow-green-500/50">
                  🤝
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                {t('home.features.connectDeliver.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('home.features.connectDeliver.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 xl:px-12 bg-gradient-to-br from-gray-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {t('home.benefits.title')}
          </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('home.benefits.subtitle')}
          </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Section - Acha Logo */}
            <div className="flex items-center justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-3xl animate-float"></div>
              <img 
                src="/acha.png" 
                alt="Acha Logo" 
                  className="relative w-full h-auto max-w-lg object-contain transform hover:scale-105 transition-transform duration-500"
              />
              </div>
            </div>

            {/* Right Section - Benefits List */}
            <div className="space-y-8">
              {/* Cost Effective */}
              <div className="group flex items-start gap-6 p-6 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white hover:shadow-lg transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  💰
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                    {t('home.benefits.costEffective.title')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {t('home.benefits.costEffective.description')}
                  </p>
                </div>
              </div>

              {/* Fast Delivery */}
              <div className="group flex items-start gap-6 p-6 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white hover:shadow-lg transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  ⚡
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                    {t('home.benefits.fastDelivery.title')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {t('home.benefits.fastDelivery.description')}
                  </p>
                </div>
              </div>

              {/* Secure & Safe */}
              <div className="group flex items-start gap-6 p-6 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white hover:shadow-lg transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  🔒
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                    {t('home.benefits.secureSafe.title')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {t('home.benefits.secureSafe.description')}
                  </p>
                </div>
              </div>

              {/* Global Network */}
              <div className="group flex items-start gap-6 p-6 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white hover:shadow-lg transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  🌍
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                    {t('home.benefits.globalNetwork.title')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {t('home.benefits.globalNetwork.description')}
                  </p>
            </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section Preview */}
      <section className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white">
        <div className="max-w-5xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                    About Us
          </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover Our Story & Mission
            </p>
          </div>

          {/* Main Content Card */}
          <div className="bg-gradient-to-br from-white to-green-50/30 rounded-3xl shadow-2xl p-8 md:p-12 border border-green-100 hover:shadow-green-500/20 transition-all duration-500 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="mb-8">
              <p className="text-gray-800 text-xl leading-relaxed mb-6">
                <span className="font-bold text-green-600">Acha Delivery</span> is a peer-to-peer delivery and local delivery partner marketplace platform headquartered in <span className="font-bold text-gray-900">Addis Ababa, Ethiopia</span>.
              </p>

              <p className="text-gray-700 text-lg leading-relaxed">
                    As a peer-to-peer marketplace, it links international and domestic travelers (acting as carriers) with buyers, senders, and recipients. Additionally, Acha Delivery serves as a delivery partner marketplace, connecting clients with verified local delivery partners...
                  </p>
              </div>

              {/* Call to Action Button */}
              <div className="text-center mt-10">
                <Link
                  to="/about"
                className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-105"
              >
                    <span>Read More About Us</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </Link>
            </div>
                </div>
              </div>
      </section>

      {/* Trips and Orders Section */}
      <TripsAndOrdersSection />

      {/* Partner With Us, Women Initiatives & Premium Section */}
      <section className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 xl:px-12 bg-gradient-to-br from-gray-50 via-white to-green-50">
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

      {/* CTA Section */}
      <section 
        className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden"
        style={{
          backgroundImage: 'url(/background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/95 via-green-600/90 to-green-700/95"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl sm:text-2xl text-white/95 mb-10 leading-relaxed">
            {t('home.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/register" className="bg-white text-green-600 hover:bg-gray-50 px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-2xl hover:shadow-white/50 hover:-translate-y-1 hover:scale-105">
              {t('home.cta.getStarted')}
            </Link>
            <Link to="/about" className="bg-transparent text-white border-3 border-white hover:bg-white hover:text-green-600 px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:scale-105">
              {t('home.cta.learnMore')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
