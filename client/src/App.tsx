import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import Register from './pages/Register'
import PostTrip from './pages/PostTrip'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post-trip" element={<PostTrip />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
