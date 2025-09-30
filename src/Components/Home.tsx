

import { Link } from "react-router-dom";
import Navbar from "./Navbar"; // Make sure your Navbar is the one we styled


const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
     

<section
  className="relative bg-cover bg-center h-screen flex items-center justify-center"
  style={{ backgroundImage: `url(/acha logo.jpg)` }} // <-- just use the path
>

        <div className="bg-black/50 p-8 rounded-xl text-center">
          <img
            src="/acha logo.jpg"
            alt="ACHA Delivery"
            className="mx-auto h-20 mb-4"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Fast & Reliable Parcel Delivery
          </h1>
          <p className="text-white/90 mb-6 text-lg md:text-xl">
            Send parcels safely and track them in real-time
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/register"
              className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Get Started
            </Link>
            <Link
              to="/track"
              className="px-6 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-black transition"
            >
              Track Parcel
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Why Choose ACHA?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Your parcels reach their destination in the shortest time possible.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold mb-2">Secure & Safe</h3>
            <p className="text-gray-600">
              We ensure your packages are handled securely from pickup to delivery.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold mb-2">Real-Time Tracking</h3>
            <p className="text-gray-600">
              Track your parcel live at any time with our tracking system.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to send your first parcel?</h2>
        <p className="mb-6 text-lg">Sign up now and experience hassle-free delivery.</p>
        <Link
          to="/register"
          className="px-8 py-3 bg-white text-orange-600 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Register Now
        </Link>
      </section>
    </div>
  );
};

export default Home;

