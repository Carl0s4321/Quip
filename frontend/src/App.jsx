import { useEffect} from 'react'
import './App.css'
import {HashRouter as Router, Routes, Route} from "react-router-dom";
import { Landing } from '../src/pages/Landing'
import { Authentication } from '../src/pages/Authentication';
import axios from 'axios';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import {Profile} from './pages/Profile'
import BoardHome from './components/BoardComponents/BoardHome';

function App() {


  useEffect(()=>{
    let token = sessionStorage.getItem("User")
    if(token){
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }
  }, [])

  return (
    <Router>
     <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path='auth' element={<Authentication/>}/>
      <Route element={<Layout/>}>
        <Route path="/home" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/board/:boardId" element={<BoardHome />} />
      </Route>
     </Routes>
    </Router>
  )
}

export default App;
