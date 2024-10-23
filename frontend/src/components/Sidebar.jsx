import './sidebar.css'
import { useState } from 'react';
import {logoShort} from '../assets'

function Sidebar(){
    // Get the sidebar, close button, and search button elements
    // let sidebar = document.querySelector(".sidebar");
    const [isOpen, setIsOpen] = useState(false)
    // let closeBtn = document.querySelector("#btn");
    // let searchBtn = document.querySelector(".bx-search");
    // let navList = document.querySelector(".nav-list");

    // // Event listener for the menu button to toggle the sidebar open/close
    // closeBtn.addEventListener("click", () => {
    // sidebar.classList.toggle("open"); // Toggle the sidebar's open state
    // navList.classList.toggle("scroll"); // Toggle scroll state
    // menuBtnChange(); // Call function to change button icon
    // });

    // // Event listener for the search button to open the sidebar
    // searchBtn.addEventListener("click", () => {
    // sidebar.classList.toggle("open");
    // navList.classList.toggle("scroll");
    // menuBtnChange(); // Call function to change button icon
    // });

    // // Function to change the menu button icon
    // function menuBtnChange() {
    // if (sidebar.classList.contains("open")) {
    //     closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); // Change icon to indicate closing
    // } else {
    //     closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); // Change icon to indicate opening
    // }
    // }
    return(
        <>
        
        <div className={`${isOpen? 'open' : ''} sidebar`}>
          <div className="logo-details">
            <div className="logo_name">Quip</div>
            <i onClick={()=>{setIsOpen(!isOpen)}} className='bx bx-menu' id="btn"></i>
          </div>
          <ul className="nav-list">
            
            <li>
              <a href="#">
                <i className='bx bx-grid-alt'></i>
                <span className="links_name">Dashboard</span>
              </a>
              <span className="tooltip">Dashboard</span>
            </li>
            
            <li>
              <a href="#">
                <i className='bx bx-user'></i>
                <span className="links_name">User</span>
              </a>
              <span className="tooltip">User</span>
            </li>
            <li>
              <a href="#">
                <i className='bx bx-chat'></i>
                <span className="links_name">Messages</span>
              </a>
              <span className="tooltip">Messages</span>
            </li>
        
            <li>
              <a href="#">
                <i className='bx bx-heart'></i>
                <span className="links_name">Saved</span>
              </a>
              <span className="tooltip">Saved</span>
            </li>

            <li>
              <a href="#">
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
              <i className='bx bx-log-out' id="log_out"></i> 
            </li>
          </ul>
        </div>

        <section className="home-section">
          <div className="text">Dashboard</div>
        </section>

        </>
    )
}

export default Sidebar