import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner with Animated Background */}
      <section className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden">
        {/* Animated SVG Wave Background */}
        <div className="absolute inset-0 overflow-hidden">
          <svg 
            className="absolute bottom-0 left-0 w-full h-full"
            viewBox="0 0 1440 320" 
            preserveAspectRatio="none"
            style={{ height: '100%', width: '100%' }}
          >
            <defs>
              <linearGradient id="aboutWaveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1E88E5" stopOpacity="0.1">
                  <animate attributeName="stop-opacity" values="0.1;0.2;0.1" dur="4s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="#26C6DA" stopOpacity="0.15">
                  <animate attributeName="stop-opacity" values="0.15;0.25;0.15" dur="4s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#43A047" stopOpacity="0.1">
                  <animate attributeName="stop-opacity" values="0.1;0.2;0.1" dur="4s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            <path 
              fill="url(#aboutWaveGradient1)" 
              d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,133.3C672,117,768,107,864,112C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            >
              <animate 
                attributeName="d" 
                values="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,133.3C672,117,768,107,864,112C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,154.7C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,133.3C672,117,768,107,864,112C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                dur="8s" 
                repeatCount="indefinite" 
              />
            </path>
          </svg>
        </div>

        {/* Floating Gradient Orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-15 blur-3xl animate-float" style={{ background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%)', animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 w-40 h-40 rounded-full opacity-12 blur-3xl animate-float" style={{ background: 'linear-gradient(135deg, #26C6DA 0%, #43A047 50%)', animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-36 h-36 rounded-full opacity-10 blur-3xl animate-float" style={{ background: 'linear-gradient(135deg, #43A047 0%, #1E88E5 50%)', animationDelay: '3s' }}></div>

        <div className="relative max-w-7xl mx-auto z-10">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>

          {/* Page Title */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 md:mb-6">
              <span className="bg-clip-text text-transparent animate-gradient-shift" style={{ 
                background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                About Us
              </span>
            </h1>
            <div className="w-24 h-1 mx-auto rounded-full animate-gradient-shift" style={{ 
              background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)',
              backgroundSize: '200% 200%'
            }}></div>
          </div>
        </div>
      </section>

      {/* About Content Section */}
      <section className="relative py-12 md:py-16 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-0 md:p-0 border-2 border-transparent hover:border-blue-300 transition-all duration-300 overflow-hidden mb-16 md:mb-20" style={{ borderColor: 'rgba(30, 136, 229, 0.2)' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative group h-full min-h-[400px] md:min-h-[500px]">
                <img 
                  src="/about.jpg" 
                  alt="About Acha Delivery" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/10 pointer-events-none"></div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6">
                  <span className="font-bold text-gray-900" style={{ color: '#1E88E5' }}>Acha Delivery</span> is a peer-to-peer delivery and local delivery partner marketplace platform headquartered in <span className="font-semibold text-gray-900">Addis Ababa, Ethiopia</span>.
                </p>

                <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6">
                  As a peer-to-peer marketplace, it links international and domestic travelers (acting as carriers) with buyers, senders, and recipients.
                </p>

                <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6">
                  Additionally, Acha Delivery serves as a delivery partner marketplace, connecting clients with verified local delivery partners — including bicycle riders, e-bike riders, and motorcycle couriers — for fast, on-demand delivery services within Ethiopia.
                </p>

                <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
                  This dual approach makes Acha Delivery a smart, sustainable solution for both cross-border and local shipping needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(30, 136, 229, 0.05) 0%, rgba(38, 198, 218, 0.05) 50%, rgba(67, 160, 71, 0.05) 100%)' }}>
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl animate-float" style={{ background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)', animationDelay: '0s' }}></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-5 blur-3xl animate-float" style={{ background: 'linear-gradient(135deg, #43A047 0%, #26C6DA 50%, #1E88E5 100%)', animationDelay: '2s' }}></div>
        
        <div className="relative max-w-7xl mx-auto z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 md:mb-6">
              <span className="bg-clip-text text-transparent animate-gradient-shift" style={{ 
                background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Mission & Vision
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Mission Card */}
            <div className="group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-blue-300 overflow-hidden p-8 md:p-10">
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, rgba(30, 136, 229, 0.05) 0%, rgba(38, 198, 218, 0.05) 100%)' }}></div>
              
              {/* Icon */}
              <div className="relative z-10 mb-6">
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg" style={{ 
                  background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 100%)',
                  boxShadow: '0 8px 25px rgba(30, 136, 229, 0.4)'
                }}>
                  🎯
                </div>
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  Mission
                </h2>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed italic">
                  "Acha Delivery connects travelers with spare luggage space and verified local delivery partners (cycle, e-bike, and motorcycle riders) to provide affordable, reliable, and sustainable delivery solutions for domestic and international senders across Ethiopia — making every trip and ride count while saving time and money for everyone involved."
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-green-300 overflow-hidden p-8 md:p-10">
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, rgba(67, 160, 71, 0.05) 0%, rgba(38, 198, 218, 0.05) 100%)' }}></div>
              
              {/* Icon */}
              <div className="relative z-10 mb-6">
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg" style={{ 
                  background: 'linear-gradient(135deg, #26C6DA 0%, #43A047 100%)',
                  boxShadow: '0 8px 25px rgba(67, 160, 71, 0.4)'
                }}>
                  👁️
                </div>
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                  Vision
                </h2>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed italic">
                  "To become the leading peer-to-peer and on-demand delivery ecosystem in Ethiopia at 2030, transforming how people and goods move efficiently, affordably, and sustainably across borders and communities."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Motto Section */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-10 md:p-16 border-2 overflow-hidden" style={{ borderColor: 'rgba(30, 136, 229, 0.3)' }}>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)' }}></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: 'linear-gradient(135deg, #43A047 0%, #26C6DA 50%, #1E88E5 100%)' }}></div>
            
            <div className="relative z-10 text-center">
              <div className="inline-block mb-6">
                <div className="w-24 h-24 rounded-full flex items-center justify-center text-5xl mx-auto shadow-lg animate-float" style={{ 
                  background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)',
                  boxShadow: '0 8px 30px rgba(30, 136, 229, 0.4)'
                }}>
                  💎
                </div>
              </div>
              <p className="text-base md:text-lg text-gray-600 mb-4 font-semibold uppercase tracking-wider">Our Motto</p>
              <p className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent animate-gradient-shift" style={{ 
                background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 4px 20px rgba(30, 136, 229, 0.2)'
              }}>
                "Unmatched Delivery"
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
