import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import './App.css'
import {About, Footer, Hero, Navbar, Subscribe, Testimonials, Auth, Home} from './components'

function App() {
  return (
    <Router>
    <div className="relative mt-14">
      <Routes>
        <Route path="/" element={
          <>
            <Navbar/>
            <Hero />
            <About />
            <div className='bg-custom-overall-gradient'>
              <Testimonials />
              <Subscribe />
            </div>
            <Footer/>
          </>
        } />
        <Route path="/auth" element={<Auth />} /> {/* only render auth component on /auth */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;