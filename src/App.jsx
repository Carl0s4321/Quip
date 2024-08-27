import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import './App.css'
import {About, Footer, Hero, Navbar, Subscribe, Testimonials, Auth, Home} from './components'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar isHome={false}/>
            <div className="relative mt-14">
            <Hero />
            <About />
            <div className='bg-custom-overall-gradient'>
              <Testimonials />
              <Subscribe />
            </div>
            <Footer/>
            </div>
          </>
        } />
        <Route path="/auth" element={<Auth />} /> {/* only render auth component on /auth */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;