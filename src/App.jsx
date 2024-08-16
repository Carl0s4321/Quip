import { BrowserRouter } from 'react-router-dom'
import './App.css'
import {About, Hero, Navbar, Testimonials,} from './components'

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Hero/>
      <About/>
      <Testimonials/>

    </BrowserRouter>
  )
}

export default App
