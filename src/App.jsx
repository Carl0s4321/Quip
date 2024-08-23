import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import './App.css'
import {About, Footer, Hero, Navbar, Subscribe, Testimonials, Auth} from './components'

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
      </Routes>
    </div>
    </Router>
  );
}

export default App;