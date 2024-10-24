import './sidebar.css'
import { useState } from 'react';
import {logoShort} from '../assets'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Sidebar(){
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate();

    function handleLogout(){
      sessionStorage.removeItem("User")
      delete axios.defaults.headers.common["Authorization"];
      navigate("/")
  }

    return(
        <>
        
        <div className={`${isOpen? 'open' : ''} sidebar`}>
          <div className="logo-details">
            <div className="logo_name">Quip</div>
            <i onClick={()=>{setIsOpen(!isOpen)}} className={`${isOpen? 'bx-menu-alt-right' : 'bx-menu'} bx`} id="btn"></i>
          </div>
          <ul className="nav-list">
            
            <li>
              <a onClick={()=>{navigate("/home")}}>
                <i className='bx bx-grid-alt'></i>
                <span className="links_name">Dashboard</span>
              </a>
              <span className="tooltip">Dashboard</span>
            </li>
            
            <li>
              <a onClick={()=>{navigate("/profile")}}>
                <i className='bx bx-user'></i>
                <span className="links_name">User</span>
              </a>
              <span className="tooltip">User</span>
            </li>
            <li>
              <a>
                <i className='bx bx-chat'></i>
                <span className="links_name">Messages</span>
              </a>
              <span className="tooltip">Messages</span>
            </li>
        
            <li>
              <a>
                <i className='bx bx-heart'></i>
                <span className="links_name">Saved</span>
              </a>
              <span className="tooltip">Saved</span>
            </li>

            <li>
              <a>
                <i className='bx bx-cog'></i>
                <span className="links_name">Setting</span>
              </a>
              <span className="tooltip">Setting</span>
            </li>


            <li className="profile">
              <div className="profile-details">
                {/* <img src="profile.jpg" alt="profileImg"> */}
                <div className="name_job">
                  <div className="name">user</div>
                  <div className="job">user email</div>
                </div>
              </div>
              <i className='bx bx-log-out cursor-pointer' id="log_out" onClick={handleLogout}/>
            </li>
          </ul>
        </div>

        </>
    )
}

export default Sidebar