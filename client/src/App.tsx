import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import Register from './pages/Register'
import DashboardRouter from './pages/DashboardRouter'
import PostTrip from './pages/PostTrip'
import BrowseTrips from './pages/BrowseTrips'
import PostOrder from './pages/PostOrder'
import PostDeliveryItem from './pages/PostDeliveryItem'
import FindDeliveryItem from './pages/FindDeliveryItem'
import Search from './pages/Search'
import PartnerWithUs from './pages/PartnerWithUs'
import GiftDeliveryPartner from './pages/GiftDeliveryPartner'
import WomenInitiatives from './pages/WomenInitiatives'
import About from './pages/About'
import Premium from './pages/Premium'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<DashboardRouter />} />
          <Route path="/post-trip" element={<PostTrip />} />
          <Route path="/browse-trips" element={<BrowseTrips />} />
          <Route path="/post-order" element={<PostOrder />} />
          <Route path="/post-delivery-item" element={<PostDeliveryItem />} />
          <Route path="/find-delivery-item" element={<FindDeliveryItem />} />
          <Route path="/search" element={<Search />} />
          <Route path="/partner-with-us" element={<PartnerWithUs />} />
          <Route path="/gift-delivery-partner" element={<GiftDeliveryPartner />} />
          <Route path="/women-initiatives" element={<WomenInitiatives />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
