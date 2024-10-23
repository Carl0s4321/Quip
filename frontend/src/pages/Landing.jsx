import Hero from '../components/LandingComponents/HeroLanding';
import About from '../components/LandingComponents/About';
import Testimonials from '../components/LandingComponents/Testimonials';
import Subscribe from '../components/LandingComponents/Subscribe';
import Footer from '../components/LandingComponents/Footer';

export function Landing() {
  return (
    <>
      <Hero/>
      <About/>
      <div className='bg-custom-overall-gradient'>
        <Testimonials />
        <Subscribe />
      </div>
      <Footer/>
    </>
  )
};