
import './App.css'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import { BrowserRouter } from "react-router-dom";

function App() {

  return (
    <>
    <BrowserRouter>
  
        <Home/>
    </BrowserRouter>
      
   
    </>
  )
}

export default App
