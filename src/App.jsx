import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css'
import {About, Footer, Hero, Navbar, Subscribe, Testimonials, Auth, Home, BoardHome} from './components'
import { account } from './lib/appwrite';
import useUserStore from './store/userStore';
import { useEffect } from 'react';

function App() {
  const { setUser, setIsAuthenticated, clearUser, isAuthenticated } = useUserStore();
  useEffect(() => {
    const checkSession = async () => {
      const storedSession = localStorage.getItem("appwrite-session");
      // console.log(storedSession)
      
      if (storedSession) {
        try {
          const user = await account.get(); // Check if the session is still valid
          setUser(user);
          setIsAuthenticated(true);
          // console.log('here')
        } catch (error) {
          // Session invalid, clear stored session
          localStorage.removeItem("appwrite-session");
          clearUser();
          setIsAuthenticated(false);
        }
      }
    };

    checkSession();
  }, [setIsAuthenticated]);

  // console.log('authenthicated? ', isAuthenticated)
  
  return (
    <Router>
      <Navbar/>
      
      <Routes>
        <Route path="/" element={
           isAuthenticated ? (
            <Navigate to="/home" /> // redirect authenticated users to /home
          ) : (
          <>
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
  )} />
        <Route path="/auth" element={<Auth />} /> {/* only render auth component on /auth */}
        <Route path="/home" element={<Home />} />
        <Route path="/board/:boardId" element={<BoardHome />} />
      </Routes>
    </Router>
  );
}

export default App;