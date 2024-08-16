import { BrowserRouter } from 'react-router-dom'
import './App.css'
import {About, Footer, Hero, Navbar, Subscribe, Testimonials,} from './components'

function App() {
  return (
    <BrowserRouter>
      <div className="relative mt-14">
        <Navbar />
        <Hero />
        <About />
        <Testimonials />
        <Subscribe/>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}
export default App
