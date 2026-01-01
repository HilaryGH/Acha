import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section 
        className="relative px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center"
        style={{
          height: '100vh',
          backgroundImage: `url('/hero%20image.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#f0f0f0'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 "></div>
        
        {/* Content Container - Left Aligned */}
        <div className="relative z-10 max-w-4xl mx-auto lg:mx-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 md:mb-8 leading-tight text-left drop-shadow-lg">
            Connect Travelers,{' '}
            <span style={{ background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Deliver Items
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 md:mb-10 lg:mb-12 leading-relaxed max-w-2xl text-left drop-shadow-md">
            Post your travel plans and help others send items between cities. 
            Find travelers going your way and make shipping easier, faster, and more personal.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-center mb-6 md:mb-8 lg:mb-10">
            How It Works
          </h2>
          <p className="text-center text-gray-600 mb-16 md:mb-20 lg:mb-24 text-lg sm:text-xl max-w-2xl mx-auto">
            Simple steps to connect travelers with senders
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {/* Feature Card 1 */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 sm:p-10 lg:p-12 rounded-2xl text-center transition-all duration-300 shadow-md hover:-translate-y-2 hover:shadow-xl border-2" style={{ borderColor: 'rgba(30, 136, 229, 0.2)' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#1E88E5'; e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(30, 136, 229, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(30, 136, 229, 0.2)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'; }}>
              <div className="text-5xl sm:text-6xl mb-6 md:mb-8">✈️</div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 md:mb-6">
                Post Your Trip
              </h3>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                Share your travel date, departure city, and destination. Help others while you travel.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 sm:p-10 lg:p-12 rounded-2xl text-center transition-all duration-300 shadow-md hover:-translate-y-2 hover:shadow-xl border-2" style={{ borderColor: 'rgba(38, 198, 218, 0.2)' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#26C6DA'; e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(38, 198, 218, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(38, 198, 218, 0.2)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'; }}>
              <div className="text-5xl sm:text-6xl mb-6 md:mb-8">📦</div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 md:mb-6">
                Find Travelers
              </h3>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                Search for travelers going to your destination and request item delivery.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 sm:p-10 lg:p-12 rounded-2xl text-center transition-all duration-300 shadow-md hover:-translate-y-2 hover:shadow-xl border-2" style={{ borderColor: 'rgba(67, 160, 71, 0.2)' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#43A047'; e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(67, 160, 71, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(67, 160, 71, 0.2)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'; }}>
              <div className="text-5xl sm:text-6xl mb-6 md:mb-8">🤝</div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 md:mb-6">
                Connect & Deliver
              </h3>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                Connect with travelers, coordinate pickup and delivery, and make shipping personal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 xl:px-12" style={{ background: 'linear-gradient(135deg, rgba(30, 136, 229, 0.05) 0%, rgba(38, 198, 218, 0.05) 50%, rgba(67, 160, 71, 0.05) 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-center mb-6 md:mb-8 lg:mb-10">
            Why Choose Acha Delivery?
          </h2>
          <p className="text-center text-gray-600 mb-16 md:mb-20 lg:mb-24 text-lg sm:text-xl max-w-2xl mx-auto">
            Experience the benefits of peer-to-peer delivery
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-6">💰</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Cost Effective</h3>
              <p className="text-gray-600 text-base leading-relaxed">Save money compared to traditional shipping services.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-6">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Fast Delivery</h3>
              <p className="text-gray-600 text-base leading-relaxed">Get your items delivered quickly by travelers.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-6">🔒</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure & Safe</h3>
              <p className="text-gray-600 text-base leading-relaxed">Trusted travelers with verified profiles.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-6">🌍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Global Network</h3>
              <p className="text-gray-600 text-base leading-relaxed">Connect with travelers worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-center mb-6 md:mb-8 lg:mb-10">
            What Our Users Say
          </h2>
          <p className="text-center text-gray-600 mb-16 md:mb-20 lg:mb-24 text-lg sm:text-xl max-w-2xl mx-auto">
            Trusted by travelers and senders worldwide
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            <div className="bg-gray-50 p-8 md:p-10 rounded-xl border-2 border-gray-200">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#1E88E5] to-[#26C6DA] flex items-center justify-center text-white font-bold text-xl">A</div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 text-lg">Ahmed Hassan</h4>
                  <p className="text-sm text-gray-600">Traveler</p>
                </div>
              </div>
              <p className="text-gray-700 italic text-base leading-relaxed mb-4">"Acha Delivery made it so easy to help others while traveling. Great platform!"</p>
              <div className="flex text-yellow-400 mt-6">★★★★★</div>
            </div>
            <div className="bg-gray-50 p-8 md:p-10 rounded-xl border-2 border-gray-200">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#26C6DA] to-[#43A047] flex items-center justify-center text-white font-bold text-xl">M</div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 text-lg">Mariam Ali</h4>
                  <p className="text-sm text-gray-600">Sender</p>
                </div>
              </div>
              <p className="text-gray-700 italic text-base leading-relaxed mb-4">"I found a traveler going to my destination and saved so much on shipping costs!"</p>
              <div className="flex text-yellow-400 mt-6">★★★★★</div>
            </div>
            <div className="bg-gray-50 p-8 md:p-10 rounded-xl border-2 border-gray-200">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#43A047] to-[#9CCC65] flex items-center justify-center text-white font-bold text-xl">Y</div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 text-lg">Yonas Tekle</h4>
                  <p className="text-sm text-gray-600">Traveler</p>
                </div>
              </div>
              <p className="text-gray-700 italic text-base leading-relaxed mb-4">"Simple, fast, and reliable. Highly recommend Acha Delivery to everyone!"</p>
              <div className="flex text-yellow-400 mt-6">★★★★★</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 xl:px-12" style={{ background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 md:mb-10 lg:mb-12">
            Ready to Get Started?
          </h2>
          <p className="text-xl sm:text-2xl text-white/90 mb-10 md:mb-12 lg:mb-14 leading-relaxed">
            Join thousands of travelers and senders making shipping easier and more affordable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <Link to="/register" className="w-full sm:w-auto bg-white text-gray-900 px-6 sm:px-8 md:px-10 py-3 sm:py-3 md:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 shadow-lg hover:-translate-y-1 hover:shadow-xl active:translate-y-0 whitespace-nowrap text-center">
              Get Started Now
            </Link>
            <button className="w-full sm:w-auto bg-transparent text-white border-2 border-white px-6 sm:px-8 md:px-10 py-3 sm:py-3 md:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 hover:bg-white hover:text-gray-900 hover:-translate-y-1 active:translate-y-0 whitespace-nowrap">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
