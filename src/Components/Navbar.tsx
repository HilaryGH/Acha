

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/acha logo.jpg" alt="ACHA Delivery" className="h-10 w-10 object-contain" />
            <span className="text-white font-bold text-xl sm:text-2xl">ACHA Delivery</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-gray-200 font-medium transition">Home</Link>
            <Link to="/track" className="text-white hover:text-gray-200 font-medium transition">Track Parcel</Link>
            <Link to="/pricing" className="text-white hover:text-gray-200 font-medium transition">Pricing</Link>
            <Link to="/contact" className="text-white hover:text-gray-200 font-medium transition">Contact</Link>
            <Link
              to="/login"
              className="ml-4 bg-white text-orange-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-orange-500 to-orange-600 px-6 pt-4 pb-6 space-y-3 shadow-lg">
          <Link to="/" className="block text-white font-medium hover:text-gray-200 transition">Home</Link>
          <Link to="/track" className="block text-white font-medium hover:text-gray-200 transition">Track Parcel</Link>
          <Link to="/pricing" className="block text-white font-medium hover:text-gray-200 transition">Pricing</Link>
          <Link to="/contact" className="block text-white font-medium hover:text-gray-200 transition">Contact</Link>
          <Link
            to="/login"
            className="block text-center bg-white text-orange-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

