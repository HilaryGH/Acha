import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import Register from './pages/Register'
import PostTrip from './pages/PostTrip'
import PostOrder from './pages/PostOrder'
import PostDeliveryItem from './pages/PostDeliveryItem'
import FindDeliveryItem from './pages/FindDeliveryItem'
import OrderTracking from './pages/OrderTracking'
import MatchTraveler from './pages/MatchTraveler'
import AssignPartner from './pages/AssignPartner'
import About from './pages/About'
import PartnerWithUs from './pages/PartnerWithUs'
import WomenInitiatives from './pages/WomenInitiatives'
import Premium from './pages/Premium'
import DashboardRouter from './pages/DashboardRouter'
import SearchTravelers from './pages/SearchTravelers'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post-trip" element={<PostTrip />} />
          <Route path="/post-order" element={<PostOrder />} />
          <Route path="/post-delivery-item" element={<PostDeliveryItem />} />
          <Route path="/find-delivery-item" element={<FindDeliveryItem />} />
          <Route path="/orders/track/:orderId" element={<OrderTracking />} />
          <Route path="/orders/match/:orderId" element={<MatchTraveler />} />
          <Route path="/orders/assign/:orderId" element={<AssignPartner />} />
          <Route path="/about" element={<About />} />
          <Route path="/partner-with-us" element={<PartnerWithUs />} />
          <Route path="/women-initiatives" element={<WomenInitiatives />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/dashboard" element={<DashboardRouter />} />
          <Route path="/search" element={<SearchTravelers />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
