import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Home() {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      {/* Hero Section with Title */}
      <section 
        className="relative h-screen flex flex-col bg-gray-50 overflow-hidden"
      >
        {/* Page Title */}
        <div className="relative bg-gradient-to-r from-blue-600 via-cyan-500 to-green-600 py-4 sm:py-6 overflow-hidden flex-shrink-0">
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-2 h-2 bg-white rounded-full opacity-60 animate-float" style={{ animationDelay: '0s' }}></div>
            <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-white rounded-full opacity-40 animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-0 left-3/4 w-2 h-2 bg-white rounded-full opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center relative z-10">
            {/* Animated English text */}
            <span className="inline-block">
              {'Acha Delivery'.split('').map((char, index) => (
                <span
                  key={`english-${index}`}
                  className={`letter-reveal letter-bounce glow-pulse ${
                    index % 2 === 0 ? 'letter-bounce-delay-1' : 'letter-bounce-delay-2'
                  }`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    color: '#ffffff',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3), 0 0 10px rgba(255,255,255,0.2)',
                    animation: `letter-reveal 0.8s ease-out ${index * 0.1}s forwards, letter-bounce 2s ease-in-out ${index * 0.1 + 0.8}s infinite`,
                    opacity: 1
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
            
            {/* Space between */}
            <span className="inline-block mx-2 sm:mx-3 md:mx-4"> </span>
            
            {/* Animated Amharic text with gradient */}
            <span className="text-3xl sm:text-4xl md:text-5xl inline-block">
              {'አቻ ደሊቨሪ'.split('').map((char, index) => (
                <span
                  key={`amharic-${index}`}
                  className={`letter-reveal letter-bounce glow-pulse ${
                    index === 0 ? 'letter-bounce-delay-1' :
                    index === 1 ? 'letter-bounce-delay-2' :
                    index === 2 ? 'letter-bounce-delay-3' : 'letter-bounce-delay-4'
                  }`}
                  style={{
                    animationDelay: `${(index + 10) * 0.1}s`,
                    display: 'inline-block',
                    transformStyle: 'preserve-3d',
                    perspective: '1000px',
                    color: '#ffffff',
                    textShadow: '0 2px 8px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.3)',
                    background: 'linear-gradient(90deg, #ffffff 0%, #E3F2FD 50%, #ffffff 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: `gradient-wave 3s linear infinite, letter-reveal 0.8s ease-out ${(index + 10) * 0.1}s forwards`,
                    opacity: 1
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
          </h1>
        </div>

        {/* Hero Content */}
        <div className="flex-1 flex  w-full">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-4 pb-4 md:pt-0 md:pb-0">
            <div className="flex flex-col lg:flex-row  gap-6 lg:gap-12">
            {/* Content - Left Half */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center relative text-center lg:text-left">
              {/* Animated gradient orbs - floating background decoration */}
              <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full opacity-10 blur-3xl animate-float" style={{ background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)' }}></div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-full opacity-8 blur-3xl animate-float" style={{ background: 'linear-gradient(135deg, #43A047 0%, #26C6DA 50%, #1E88E5 100%)', animationDelay: '1.5s' }}></div>
              <div className="absolute top-1/2 -left-4 w-24 h-24 rounded-full opacity-12 blur-2xl animate-float" style={{ background: 'linear-gradient(135deg, #26C6DA 0%, #43A047 50%, #1E88E5 100%)', animationDelay: '0.75s' }}></div>

              {/* Animated title with staggered entrance */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 md:mb-4 leading-tight relative z-10">
                <span className="inline-block text-gray-900 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
            {t('home.hero.title')}{' '}
                </span>
                <span 
                  className="inline-block animate-gradient-shift bg-clip-text text-transparent"
                  style={{ 
                    background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animationDelay: '0.4s'
                  }}
                >
              {t('home.hero.titleHighlight')}
            </span>
          </h1>

              {/* Animated subtitle with fade and slide */}
              <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-3 md:mb-4 leading-relaxed relative z-10 animate-fade-in-up mx-auto lg:mx-0 max-w-xl lg:max-w-none" style={{ animationDelay: '0.6s' }}>
            {t('home.hero.subtitle')}
          </p>

              {/* Animated feature badges with brand colors */}
              <div className="flex flex-wrap gap-2 mb-3 md:mb-4 relative z-10 animate-fade-in-up justify-center lg:justify-start" style={{ animationDelay: '0.8s' }}>
                <div className="group relative overflow-hidden px-4 py-2 rounded-full transition-all duration-300 hover:scale-105" style={{ background: 'linear-gradient(135deg, rgba(30, 136, 229, 0.1) 0%, rgba(38, 198, 218, 0.1) 50%, rgba(67, 160, 71, 0.1) 100%)' }}>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)' }}></div>
                    <span className="text-xs font-semibold" style={{ background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Fast Delivery</span>
                  </div>
                </div>
                <div className="group relative overflow-hidden px-4 py-2 rounded-full transition-all duration-300 hover:scale-105" style={{ background: 'linear-gradient(135deg, rgba(38, 198, 218, 0.1) 0%, rgba(67, 160, 71, 0.1) 50%, rgba(30, 136, 229, 0.1) 100%)' }}>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'linear-gradient(135deg, #26C6DA 0%, #43A047 50%, #1E88E5 100%)', animationDelay: '0.3s' }}></div>
                    <span className="text-xs font-semibold" style={{ background: 'linear-gradient(135deg, #26C6DA 0%, #43A047 50%, #1E88E5 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Secure & Safe</span>
                  </div>
                </div>
                <div className="group relative overflow-hidden px-4 py-2 rounded-full transition-all duration-300 hover:scale-105" style={{ background: 'linear-gradient(135deg, rgba(67, 160, 71, 0.1) 0%, rgba(30, 136, 229, 0.1) 50%, rgba(38, 198, 218, 0.1) 100%)' }}>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'linear-gradient(135deg, #43A047 0%, #1E88E5 50%, #26C6DA 100%)', animationDelay: '0.6s' }}></div>
                    <span className="text-xs font-semibold" style={{ background: 'linear-gradient(135deg, #43A047 0%, #1E88E5 50%, #26C6DA 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Global Network</span>
                  </div>
                </div>
              </div>

              {/* Animated CTA button with gradient animation */}
              <div className="relative z-10 animate-fade-in-up flex justify-center lg:justify-start" style={{ animationDelay: '1s' }}>
                <Link 
                  to="/register" 
                  className="group relative inline-block overflow-hidden px-6 py-3 rounded-full text-white font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 active:translate-y-0"
                  style={{ background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)' }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {t('home.cta.getStarted')}
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-shift"
                    style={{ background: 'linear-gradient(135deg, #43A047 0%, #26C6DA 50%, #1E88E5 100%)', backgroundSize: '200% 200%' }}
                  ></div>
                </Link>
              </div>
            </div>
            
            {/* Image - Right Half */}
            <div className="w-full lg:w-1/2 flex items-start justify-center lg:items-center">
              <img 
                src="/acha hero.jpg" 
                alt="Acha Hero" 
                className="w-full h-auto max-h-[500px] md:max-h-[600px] object-contain rounded-lg shadow-xl"
              />
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Hanging Cards */}
      <section className="relative py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white overflow-hidden">
        {/* Decorative top connection line */}
        <div className="absolute top-0 left-0 right-0 h-px opacity-20" style={{ background: 'linear-gradient(90deg, transparent 0%, #1E88E5 25%, #26C6DA 50%, #43A047 75%, transparent 100%)' }}></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-20 relative">
            {/* Feature Card 1 - Post Your Trip */}
            <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              {/* Hanging Rope/Chain */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-0">
                <div className="relative w-1 h-16 mx-auto" style={{ 
                  background: 'linear-gradient(180deg, rgba(30, 136, 229, 0.3) 0%, rgba(30, 136, 229, 0.1) 100%)',
                  boxShadow: '0 0 10px rgba(30, 136, 229, 0.2)'
                }}>
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-2" style={{ 
                    borderColor: '#1E88E5',
                    background: 'radial-gradient(circle, rgba(30, 136, 229, 0.3) 0%, transparent 70%)'
                  }}></div>
                  {/* Connection point */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full animate-pulse" style={{ 
                    background: '#1E88E5',
                    boxShadow: '0 0 15px rgba(30, 136, 229, 0.6)'
                  }}></div>
                </div>
              </div>

              {/* Card */}
              <div className="relative bg-gradient-to-br from-white to-blue-50/30 p-8 sm:p-10 lg:p-12 rounded-3xl text-center transition-all duration-500 shadow-xl hover:shadow-2xl border-t-4 hover:-translate-y-3 transform origin-top" 
                style={{ 
                  borderTopColor: '#1E88E5',
                  boxShadow: '0 20px 40px rgba(30, 136, 229, 0.15), 0 0 0 1px rgba(30, 136, 229, 0.1)'
                }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.borderTopColor = '#26C6DA';
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(30, 136, 229, 0.25), 0 0 0 2px rgba(38, 198, 218, 0.2)';
                }} 
                onMouseLeave={(e) => { 
                  e.currentTarget.style.borderTopColor = '#1E88E5';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(30, 136, 229, 0.15), 0 0 0 1px rgba(30, 136, 229, 0.1)';
                }}>
                {/* Glowing top border */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ 
                  background: 'linear-gradient(90deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)',
                  boxShadow: '0 0 20px rgba(30, 136, 229, 0.6)'
                }}></div>

                {/* Icon Container */}
                <div className="relative mb-6 md:mb-8">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" style={{ 
                      background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 100%)',
                      transform: 'scale(1.5)'
                    }}></div>
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-4xl md:text-5xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl" style={{ 
                      background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 100%)',
                      boxShadow: '0 10px 30px rgba(30, 136, 229, 0.4)'
                    }}>
                      ✈️
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300" style={{ 
                  background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                {t('home.features.postTrip.title')}
              </h3>
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg font-medium">
                {t('home.features.postTrip.description')}
              </p>
              </div>
            </div>

            {/* Feature Card 2 - Find Travelers */}
            <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {/* Hanging Rope/Chain */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-0">
                <div className="relative w-1 h-16 mx-auto" style={{ 
                  background: 'linear-gradient(180deg, rgba(38, 198, 218, 0.3) 0%, rgba(38, 198, 218, 0.1) 100%)',
                  boxShadow: '0 0 10px rgba(38, 198, 218, 0.2)'
                }}>
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-2" style={{ 
                    borderColor: '#26C6DA',
                    background: 'radial-gradient(circle, rgba(38, 198, 218, 0.3) 0%, transparent 70%)'
                  }}></div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full animate-pulse" style={{ 
                    background: '#26C6DA',
                    boxShadow: '0 0 15px rgba(38, 198, 218, 0.6)',
                    animationDelay: '0.3s'
                  }}></div>
                </div>
              </div>

              {/* Card */}
              <div className="relative bg-gradient-to-br from-white to-cyan-50/30 p-8 sm:p-10 lg:p-12 rounded-3xl text-center transition-all duration-500 shadow-xl hover:shadow-2xl border-t-4 hover:-translate-y-3 transform origin-top" 
                style={{ 
                  borderTopColor: '#26C6DA',
                  boxShadow: '0 20px 40px rgba(38, 198, 218, 0.15), 0 0 0 1px rgba(38, 198, 218, 0.1)'
                }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.borderTopColor = '#43A047';
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(38, 198, 218, 0.25), 0 0 0 2px rgba(67, 160, 71, 0.2)';
                }} 
                onMouseLeave={(e) => { 
                  e.currentTarget.style.borderTopColor = '#26C6DA';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(38, 198, 218, 0.15), 0 0 0 1px rgba(38, 198, 218, 0.1)';
                }}>
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ 
                  background: 'linear-gradient(90deg, #26C6DA 0%, #43A047 50%, #1E88E5 100%)',
                  boxShadow: '0 0 20px rgba(38, 198, 218, 0.6)'
                }}></div>

                <div className="relative mb-6 md:mb-8">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" style={{ 
                      background: 'linear-gradient(135deg, #26C6DA 0%, #43A047 100%)',
                      transform: 'scale(1.5)'
                    }}></div>
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-4xl md:text-5xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl" style={{ 
                      background: 'linear-gradient(135deg, #26C6DA 0%, #43A047 100%)',
                      boxShadow: '0 10px 30px rgba(38, 198, 218, 0.4)'
                    }}>
                      📦
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300" style={{ 
                  background: 'linear-gradient(135deg, #26C6DA 0%, #43A047 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                {t('home.features.findTravelers.title')}
              </h3>
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg font-medium">
                {t('home.features.findTravelers.description')}
              </p>
              </div>
            </div>

            {/* Feature Card 3 - Connect & Deliver */}
            <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              {/* Hanging Rope/Chain */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-0">
                <div className="relative w-1 h-16 mx-auto" style={{ 
                  background: 'linear-gradient(180deg, rgba(67, 160, 71, 0.3) 0%, rgba(67, 160, 71, 0.1) 100%)',
                  boxShadow: '0 0 10px rgba(67, 160, 71, 0.2)'
                }}>
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-2" style={{ 
                    borderColor: '#43A047',
                    background: 'radial-gradient(circle, rgba(67, 160, 71, 0.3) 0%, transparent 70%)'
                  }}></div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full animate-pulse" style={{ 
                    background: '#43A047',
                    boxShadow: '0 0 15px rgba(67, 160, 71, 0.6)',
                    animationDelay: '0.6s'
                  }}></div>
                </div>
              </div>

              {/* Card */}
              <div className="relative bg-gradient-to-br from-white to-green-50/30 p-8 sm:p-10 lg:p-12 rounded-3xl text-center transition-all duration-500 shadow-xl hover:shadow-2xl border-t-4 hover:-translate-y-3 transform origin-top" 
                style={{ 
                  borderTopColor: '#43A047',
                  boxShadow: '0 20px 40px rgba(67, 160, 71, 0.15), 0 0 0 1px rgba(67, 160, 71, 0.1)'
                }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.borderTopColor = '#1E88E5';
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(67, 160, 71, 0.25), 0 0 0 2px rgba(30, 136, 229, 0.2)';
                }} 
                onMouseLeave={(e) => { 
                  e.currentTarget.style.borderTopColor = '#43A047';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(67, 160, 71, 0.15), 0 0 0 1px rgba(67, 160, 71, 0.1)';
                }}>
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ 
                  background: 'linear-gradient(90deg, #43A047 0%, #1E88E5 50%, #26C6DA 100%)',
                  boxShadow: '0 0 20px rgba(67, 160, 71, 0.6)'
                }}></div>

                <div className="relative mb-6 md:mb-8">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" style={{ 
                      background: 'linear-gradient(135deg, #43A047 0%, #1E88E5 100%)',
                      transform: 'scale(1.5)'
                    }}></div>
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-4xl md:text-5xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl" style={{ 
                      background: 'linear-gradient(135deg, #43A047 0%, #1E88E5 100%)',
                      boxShadow: '0 10px 30px rgba(67, 160, 71, 0.4)'
                    }}>
                      🤝
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300" style={{ 
                  background: 'linear-gradient(135deg, #43A047 0%, #1E88E5 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                {t('home.features.connectDeliver.title')}
              </h3>
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg font-medium">
                {t('home.features.connectDeliver.description')}
              </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden">
        {/* Animated SVG Wave Background */}
        <div className="absolute inset-0 overflow-hidden">
          <svg 
            className="absolute bottom-0 left-0 w-full h-full"
            viewBox="0 0 1440 320" 
            preserveAspectRatio="none"
            style={{ height: '100%', width: '100%' }}
          >
            <defs>
              <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1E88E5" stopOpacity="0.15">
                  <animate attributeName="stop-opacity" values="0.15;0.25;0.15" dur="4s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="#26C6DA" stopOpacity="0.2">
                  <animate attributeName="stop-opacity" values="0.2;0.3;0.2" dur="4s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#43A047" stopOpacity="0.15">
                  <animate attributeName="stop-opacity" values="0.15;0.25;0.15" dur="4s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
              <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#43A047" stopOpacity="0.1">
                  <animate attributeName="stop-opacity" values="0.1;0.2;0.1" dur="5s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="#26C6DA" stopOpacity="0.15">
                  <animate attributeName="stop-opacity" values="0.15;0.25;0.15" dur="5s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#1E88E5" stopOpacity="0.1">
                  <animate attributeName="stop-opacity" values="0.1;0.2;0.1" dur="5s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            <path 
              fill="url(#waveGradient1)" 
              d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,133.3C672,117,768,107,864,112C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            >
              <animate 
                attributeName="d" 
                values="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,133.3C672,117,768,107,864,112C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,154.7C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,133.3C672,117,768,107,864,112C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                dur="8s" 
                repeatCount="indefinite" 
              />
            </path>
            <path 
              fill="url(#waveGradient2)" 
              d="M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,181.3C672,181,768,203,864,208C960,213,1056,203,1152,197.3C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              opacity="0.7"
            >
              <animate 
                attributeName="d" 
                values="M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,181.3C672,181,768,203,864,208C960,213,1056,203,1152,197.3C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,208C672,213,768,203,864,197.3C960,192,1056,192,1152,197.3C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,181.3C672,181,768,203,864,208C960,213,1056,203,1152,197.3C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                dur="10s" 
                repeatCount="indefinite" 
              />
            </path>
          </svg>
        </div>

        {/* Floating Gradient Orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-20 blur-3xl animate-float" style={{ background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%)', animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 w-40 h-40 rounded-full opacity-15 blur-3xl animate-float" style={{ background: 'linear-gradient(135deg, #26C6DA 0%, #43A047 50%)', animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-36 h-36 rounded-full opacity-18 blur-3xl animate-float" style={{ background: 'linear-gradient(135deg, #43A047 0%, #1E88E5 50%)', animationDelay: '3s' }}></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 rounded-full opacity-20 blur-3xl animate-float" style={{ background: 'linear-gradient(135deg, #1E88E5 0%, #43A047 50%)', animationDelay: '2s' }}></div>

        <div className="relative max-w-7xl mx-auto z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 relative inline-block">
              <span className="relative z-10 bg-clip-text text-transparent animate-gradient-shift" style={{ 
                background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
            {t('home.benefits.title')}
              </span>
          </h2>
            <p className="text-center text-gray-700 text-lg sm:text-xl max-w-2xl mx-auto font-medium">
            {t('home.benefits.subtitle')}
          </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Section - Acha Logo */}
            <div className="flex items-center justify-center">
              <img 
                src="/acha.png" 
                alt="Acha Logo" 
                className="w-full h-auto max-w-lg object-contain"
              />
            </div>

            {/* Right Section - Creative Bullet Points */}
            <div className="space-y-6 md:space-y-8">
              {/* Cost Effective Bullet */}
              <div className="group relative flex items-start gap-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                {/* Animated Bullet Point */}
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg" style={{ 
                    background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 100%)',
                    boxShadow: '0 4px 15px rgba(30, 136, 229, 0.3)'
                  }}>
                    💰
                  </div>
                  {/* Connecting Line */}
                  <div className="absolute left-1/2 top-full w-0.5 h-8 transform -translate-x-1/2 opacity-30 group-hover:opacity-60 transition-opacity" style={{ 
                    background: 'linear-gradient(180deg, #1E88E5 0%, transparent 100%)'
                  }}></div>
                </div>
                {/* Content */}
                <div className="flex-1 pt-2">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {t('home.benefits.costEffective.title')}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {t('home.benefits.costEffective.description')}
                  </p>
                </div>
              </div>

              {/* Fast Delivery Bullet */}
              <div className="group relative flex items-start gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg" style={{ 
                    background: 'linear-gradient(135deg, #26C6DA 0%, #43A047 100%)',
                    boxShadow: '0 4px 15px rgba(38, 198, 218, 0.3)'
                  }}>
                    ⚡
                  </div>
                  <div className="absolute left-1/2 top-full w-0.5 h-8 transform -translate-x-1/2 opacity-30 group-hover:opacity-60 transition-opacity" style={{ 
                    background: 'linear-gradient(180deg, #26C6DA 0%, transparent 100%)'
                  }}></div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">
                    {t('home.benefits.fastDelivery.title')}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {t('home.benefits.fastDelivery.description')}
                  </p>
                </div>
              </div>

              {/* Secure & Safe Bullet */}
              <div className="group relative flex items-start gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg" style={{ 
                    background: 'linear-gradient(135deg, #43A047 0%, #1E88E5 100%)',
                    boxShadow: '0 4px 15px rgba(67, 160, 71, 0.3)'
                  }}>
                    🔒
                  </div>
                  <div className="absolute left-1/2 top-full w-0.5 h-8 transform -translate-x-1/2 opacity-30 group-hover:opacity-60 transition-opacity" style={{ 
                    background: 'linear-gradient(180deg, #43A047 0%, transparent 100%)'
                  }}></div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {t('home.benefits.secureSafe.title')}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {t('home.benefits.secureSafe.description')}
                  </p>
                </div>
              </div>

              {/* Global Network Bullet */}
              <div className="group relative flex items-start gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg" style={{ 
                    background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)',
                    boxShadow: '0 4px 15px rgba(30, 136, 229, 0.3)'
                  }}>
                    🌍
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {t('home.benefits.globalNetwork.title')}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {t('home.benefits.globalNetwork.description')}
                  </p>
            </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section Preview */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden">
        {/* Animated SVG Waves Background */}
        <div className="absolute inset-0 z-0">
          <svg className="absolute bottom-0 left-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="url(#waveGradient1)" opacity="0.1" style={{ animation: 'wave 15s ease-in-out infinite' }} />
            <path d="M0,192L48,197.3C96,203,192,213,288,213.3C384,213,480,203,576,181.3C672,160,768,128,864,122.7C960,117,1056,139,1152,154.7C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="url(#waveGradient2)" opacity="0.15" style={{ animation: 'wave 20s ease-in-out infinite reverse' }} />
            <defs>
              <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1E88E5" />
                <stop offset="50%" stopColor="#26C6DA" />
                <stop offset="100%" stopColor="#43A047" />
              </linearGradient>
              <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#43A047" />
                <stop offset="50%" stopColor="#26C6DA" />
                <stop offset="100%" stopColor="#1E88E5" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating Orbs */}
        <div className="absolute top-20 right-10 w-32 h-32 rounded-full opacity-20 blur-2xl animate-float" style={{ background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 100%)', animationDelay: '0s' }}></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full opacity-20 blur-3xl animate-float" style={{ background: 'linear-gradient(135deg, #26C6DA 0%, #43A047 100%)', animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full opacity-15 blur-xl animate-float" style={{ background: 'linear-gradient(135deg, #43A047 0%, #1E88E5 100%)', animationDelay: '4s' }}></div>

        <div className="relative max-w-5xl mx-auto z-10">
          {/* Title Section */}
          <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
            <div className="inline-block mb-4">
              <div className="relative">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold relative z-10">
                  <span className="bg-clip-text text-transparent animate-gradient-shift" style={{ 
                    background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 4px 8px rgba(30, 136, 229, 0.3))'
                  }}>
                    About Us
                  </span>
          </h2>
                {/* Glowing underline effect */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 rounded-full animate-glow-pulse" style={{ 
                  background: 'linear-gradient(90deg, transparent 0%, #1E88E5 50%, transparent 100%)',
                  boxShadow: '0 0 20px rgba(30, 136, 229, 0.6)'
                }}></div>
              </div>
            </div>
            <p className="text-gray-600 text-lg md:text-xl mt-6 max-w-2xl mx-auto">
              Discover Our Story & Mission
            </p>
          </div>

          {/* Main Content Card */}
          <div className="group relative bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 border border-white/20 overflow-hidden transition-all duration-500 hover:shadow-3xl hover:-translate-y-2">
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-shift" style={{ 
              background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)',
              backgroundSize: '200% 200%',
              padding: '2px'
            }}>
              <div className="w-full h-full bg-white/95 backdrop-blur-md rounded-3xl"></div>
            </div>

            {/* Decorative corner elements */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity">
              <div className="absolute top-4 right-4 w-16 h-16 rounded-full" style={{ background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 100%)' }}></div>
              <div className="absolute top-8 right-8 w-8 h-8 rounded-full" style={{ background: 'linear-gradient(135deg, #26C6DA 0%, #43A047 100%)' }}></div>
            </div>
            <div className="absolute bottom-0 left-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity">
              <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full" style={{ background: 'linear-gradient(135deg, #43A047 0%, #26C6DA 100%)' }}></div>
              <div className="absolute bottom-8 left-8 w-8 h-8 rounded-full" style={{ background: 'linear-gradient(135deg, #26C6DA 0%, #1E88E5 100%)' }}></div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg" style={{ 
                    background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)',
                    boxShadow: '0 4px 15px rgba(30, 136, 229, 0.4)'
                  }}>
                    🚀
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 text-lg md:text-xl leading-relaxed mb-6 font-medium">
                    <span className="font-bold bg-clip-text text-transparent" style={{ 
                      background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      Acha Delivery
                    </span> is a peer-to-peer delivery and local delivery partner marketplace platform headquartered in <span className="font-bold text-gray-900">Addis Ababa, Ethiopia</span>.
                  </p>

                  <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8">
                    As a peer-to-peer marketplace, it links international and domestic travelers (acting as carriers) with buyers, senders, and recipients. Additionally, Acha Delivery serves as a delivery partner marketplace, connecting clients with verified local delivery partners...
                  </p>
                </div>
              </div>

              {/* Call to Action Button */}
              <div className="text-center mt-10">
                <Link
                  to="/about"
                  className="group relative inline-block overflow-hidden px-10 py-4 rounded-full text-white font-bold text-base md:text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-2 active:translate-y-0"
                  style={{ 
                    background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)',
                    boxShadow: '0 10px 30px rgba(30, 136, 229, 0.4)'
                  }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <span>Read More About Us</span>
                    <svg className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-shift"
                    style={{ 
                      background: 'linear-gradient(135deg, #43A047 0%, #26C6DA 50%, #1E88E5 100%)', 
                      backgroundSize: '200% 200%',
                      boxShadow: '0 10px 40px rgba(67, 160, 71, 0.5)'
                    }}
                  ></div>
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" style={{ 
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)'
                  }}></div>
                </Link>
              </div>
            </div>
                </div>
              </div>
      </section>

      {/* Partner With Us, Women Initiatives & Premium Section */}
      <section className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8 xl:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-center">
            {/* Partner With Us */}
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                Partner With Us
              </h2>
              <p className="text-gray-600 mb-4 md:mb-5 text-sm sm:text-base">
                Invest / Partner With Us - Join us in revolutionizing the delivery and travel industry
              </p>
              <Link 
                to="/partner-with-us"
                className="group relative inline-block overflow-hidden px-5 py-2.5 rounded-full text-white font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                style={{ background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)' }}
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  Join In
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-shift"
                  style={{ background: 'linear-gradient(135deg, #43A047 0%, #26C6DA 50%, #1E88E5 100%)', backgroundSize: '200% 200%' }}
                ></div>
              </Link>
            </div>

            {/* Women Initiatives */}
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                👩 Women Initiatives
              </h2>
              <p className="text-gray-600 mb-4 md:mb-5 text-sm sm:text-base">
                Join Women Initiatives - Empower yourself and join our community of amazing women
              </p>
              <Link 
                to="/women-initiatives"
                className="group relative inline-block overflow-hidden px-5 py-2.5 rounded-full text-white font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                style={{ background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)' }}
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  Join In
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-shift"
                  style={{ background: 'linear-gradient(135deg, #43A047 0%, #26C6DA 50%, #1E88E5 100%)', backgroundSize: '200% 200%' }}
                ></div>
              </Link>
            </div>

            {/* Premium Community */}
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                ⭐ Acha Premium Community
              </h2>
              <p className="text-gray-600 mb-4 md:mb-5 text-sm sm:text-base">
                Join our premium community - Exclusive benefits for delivery partners and corporate clients
              </p>
              <Link 
                to="/premium"
                className="group relative inline-block overflow-hidden px-5 py-2.5 rounded-full text-white font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                style={{ background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)' }}
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  Join In
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-shift"
                  style={{ background: 'linear-gradient(135deg, #43A047 0%, #26C6DA 50%, #1E88E5 100%)', backgroundSize: '200% 200%' }}
                ></div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 xl:px-12" style={{ background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 md:mb-10 lg:mb-12">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl sm:text-2xl text-white/90 mb-10 md:mb-12 lg:mb-14 leading-relaxed">
            {t('home.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <Link to="/register" className="w-full sm:w-auto bg-white text-gray-900 px-6 sm:px-8 md:px-10 py-3 sm:py-3 md:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 shadow-lg hover:-translate-y-1 hover:shadow-xl active:translate-y-0 whitespace-nowrap text-center">
              {t('home.cta.getStarted')}
            </Link>
            <button className="w-full sm:w-auto bg-transparent text-white border-2 border-white px-6 sm:px-8 md:px-10 py-3 sm:py-3 md:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 hover:bg-white hover:text-gray-900 hover:-translate-y-1 active:translate-y-0 whitespace-nowrap">
              {t('home.cta.learnMore')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
