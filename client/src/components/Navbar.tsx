import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignInModal from './SignInModal';

function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results or handle search
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <div className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="w-full text-white text-sm py-2" style={{ background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4 sm:gap-6">
              <a href="tel:+251911508734" className="flex items-center gap-2 hover:text-[#9CCC65] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="hidden sm:inline">+251911508734</span>
              </a>
              <a href="mailto:g.fikre2@gmail.com" className="flex items-center gap-2 hover:text-[#9CCC65] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="hidden sm:inline">g.fikre2@gmail.com</span>
              </a>
            </div>
            <div className="hidden md:flex items-center gap-4 sm:gap-6">
              <span className="mr-2">Free delivery on orders over $50</span>
              <div className="flex items-center gap-3 sm:gap-4">
                {/* X (Twitter) */}
                <a href="#" className="hover:text-[#9CCC65] transition-colors" aria-label="X (Twitter)">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                {/* TikTok */}
                <a href="#" className="hover:text-[#9CCC65] transition-colors" aria-label="TikTok">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="#" className="hover:text-[#9CCC65] transition-colors" aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                {/* Facebook */}
                <a href="#" className="hover:text-[#9CCC65] transition-colors" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href="#" className="hover:text-[#9CCC65] transition-colors" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="w-full bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="relative flex justify-between items-center h-14 md:h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3 text-gray-900 text-xl sm:text-2xl font-bold hover:scale-105 transition-transform duration-300">
            <img 
              src="/acha.png" 
              alt="Acha Logo" 
              className="h-8 sm:h-10 w-auto"
            />
            <span className="text-gray-900">
              Acha delivery
            </span>
          </div>

          {/* Search Input - Centered */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 w-full max-w-xs">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </form>

          {/* Desktop Menu */}
          <div className={`hidden md:flex items-center gap-4 lg:gap-6`}>
            <Link 
              to="/" 
              className="text-gray-700 font-medium text-base relative py-2 transition-colors duration-300 hover:text-[#1E88E5] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#1E88E5] after:transition-all after:duration-300 hover:after:w-full"
            >
              Home
            </Link>
            <Link 
              to="/post-trip" 
              className="text-gray-700 font-medium text-base relative py-2 transition-colors duration-300 hover:text-[#1E88E5] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#1E88E5] after:transition-all after:duration-300 hover:after:w-full"
            >
              Post Trip
            </Link>
            <Link 
              to="/post-order" 
              className="text-gray-700 font-medium text-base relative py-2 transition-colors duration-300 hover:text-[#1E88E5] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#1E88E5] after:transition-all after:duration-300 hover:after:w-full"
            >
              Post Order
            </Link>
            <button 
              className="text-white px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full font-semibold text-sm transition-all duration-300 shadow-lg hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 whitespace-nowrap"
              style={{ background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)' }}
              onClick={() => setIsSignInModalOpen(true)}
            >
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-2 ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-gray-700 rounded transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-gray-700 rounded transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-gray-700 rounded transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={toggleMenu}
          ></div>
        )}
        
        {/* Mobile Menu - Slide from Left */}
        <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <img 
                  src="/acha.png" 
                  alt="Acha Logo" 
                  className="h-8 w-auto"
                />
                <span className="text-gray-900 font-bold text-lg">Acha delivery</span>
              </div>
              <button 
                onClick={toggleMenu}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Mobile Menu Links */}
            <div className="flex flex-col flex-1 py-4 px-4 gap-2">
              {/* Search Input - Above Links */}
              <form onSubmit={handleSearch} className="px-4 py-2">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <svg 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </form>
              
              <Link 
                to="/" 
                className="text-gray-700 font-medium text-base py-3 px-4 rounded-lg transition-colors duration-300 hover:text-[#1E88E5] hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/post-trip" 
                className="text-gray-700 font-medium text-base py-3 px-4 rounded-lg transition-colors duration-300 hover:text-[#1E88E5] hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Post Trip
              </Link>
              <Link 
                to="/post-order" 
                className="text-gray-700 font-medium text-base py-3 px-4 rounded-lg transition-colors duration-300 hover:text-[#1E88E5] hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Post Order
              </Link>
              
              {/* Feature Badges */}
              <div className="flex flex-col gap-1.5 px-4 py-2 mt-1">
                <div className="group relative overflow-hidden px-2.5 py-1.5 rounded-lg transition-all duration-300" style={{ background: 'linear-gradient(135deg, rgba(30, 136, 229, 0.08) 0%, rgba(38, 198, 218, 0.08) 50%, rgba(67, 160, 71, 0.08) 100%)' }}>
                  <div className="flex items-center gap-1.5">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs shadow-sm" style={{ background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)' }}>
                      <span className="text-[10px]">⚡</span>
                    </div>
                    <span className="text-[10px] font-semibold text-gray-700">Fast Delivery</span>
                  </div>
                </div>
                <div className="group relative overflow-hidden px-2.5 py-1.5 rounded-lg transition-all duration-300" style={{ background: 'linear-gradient(135deg, rgba(38, 198, 218, 0.08) 0%, rgba(67, 160, 71, 0.08) 50%, rgba(30, 136, 229, 0.08) 100%)' }}>
                  <div className="flex items-center gap-1.5">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs shadow-sm" style={{ background: 'linear-gradient(135deg, #26C6DA 0%, #43A047 50%, #1E88E5 100%)' }}>
                      <span className="text-[10px]">🔒</span>
                    </div>
                    <span className="text-[10px] font-semibold text-gray-700">Secure & Safe</span>
                  </div>
                </div>
                <div className="group relative overflow-hidden px-2.5 py-1.5 rounded-lg transition-all duration-300" style={{ background: 'linear-gradient(135deg, rgba(67, 160, 71, 0.08) 0%, rgba(30, 136, 229, 0.08) 50%, rgba(38, 198, 218, 0.08) 100%)' }}>
                  <div className="flex items-center gap-1.5">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs shadow-sm" style={{ background: 'linear-gradient(135deg, #43A047 0%, #1E88E5 50%, #26C6DA 100%)' }}>
                      <span className="text-[10px]">🌍</span>
                    </div>
                    <span className="text-[10px] font-semibold text-gray-700">Global Network</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile Menu Social Icons */}
            <div className="px-4 py-4 border-t border-gray-200">
              <div className="flex items-center justify-center gap-4">
                {/* X (Twitter) */}
                <a href="#" className="hover:text-[#1E88E5] transition-colors" aria-label="X (Twitter)" onClick={() => setIsMenuOpen(false)}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                {/* TikTok */}
                <a href="#" className="hover:text-[#1E88E5] transition-colors" aria-label="TikTok" onClick={() => setIsMenuOpen(false)}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="#" className="hover:text-[#1E88E5] transition-colors" aria-label="LinkedIn" onClick={() => setIsMenuOpen(false)}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                {/* Facebook */}
                <a href="#" className="hover:text-[#1E88E5] transition-colors" aria-label="Facebook" onClick={() => setIsMenuOpen(false)}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href="#" className="hover:text-[#1E88E5] transition-colors" aria-label="Instagram" onClick={() => setIsMenuOpen(false)}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Mobile Menu Footer */}
            <div className="p-4 border-t border-gray-200">
              <button 
                className="w-full text-white px-6 py-3 rounded-full font-semibold text-base transition-all duration-300 shadow-lg hover:-translate-y-0.5 hover:shadow-xl whitespace-nowrap"
                style={{ background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)' }}
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsSignInModalOpen(true);
                }}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
      </nav>
      <SignInModal isOpen={isSignInModalOpen} onClose={() => setIsSignInModalOpen(false)} />
    </div>
  );
}

export default Navbar;
