import { useEffect} from 'react'
import './App.css'
import {HashRouter as Router, Routes, Route} from "react-router-dom";
import { Landing } from '../src/pages/Landing'
import { Authentication } from '../src/pages/Authentication';
import axios from 'axios';

function App() {
  
  // useEffect(()=> {
  //   async function loadAllUsers() {
  //     let data = await getUsers();
  //     if(data){
  //       setUsers(data);
  //     }
  //   }

  //   loadAllUsers()
  // }, [])

  useEffect(()=>{
    let token = sessionStorage.getItem("User")
    if(token){
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }
  }, [])

  return (
    <Router>
     {/* {JSON.stringify(users)} */}
     <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path='auth' element={<Authentication/>}/>
      {/* <Route element={<Layout/>}>
        <Route path="/home" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/feeds" element={<Feeds/>}/>
      </Route> */}
     </Routes>
    </Router>
  )
}

export default App;
