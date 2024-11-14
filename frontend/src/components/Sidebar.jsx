import "./sidebar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useUserStore from "../store/UserStore";
import Chat from "./ChatComponents/Chat";

function Sidebar({ setOpenPanel, openPanel }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useUserStore();

  function handleLogout() {
    sessionStorage.removeItem("User");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/");
  }

  return (
    <>
      <div className={`${isOpen ? "open" : ""} sidebar`}>
        <div className="logo-details">
          <div className="logo_name">Quip</div>
          <i
            onClick={() => {
              setIsOpen(!isOpen);
              setOpenPanel(false)
            }}
            className={`${isOpen ? "bx-menu-alt-right" : "bx-menu"} bx`}
            id="btn"
          ></i>
        </div>
        <ul className="nav-list">
          <li>
            <a
              onClick={() => {
                navigate("/home");
                setIsOpen(false);
              }}
            >
              <i className="bx bx-grid-alt"></i>
              <span className="links_name">Dashboard</span>
            </a>
            <span className="tooltip">Dashboard</span>
          </li>

          <li>
            <a
              onClick={() => {
                navigate("/profile");
                setIsOpen(false);
              }}
            >
              <i className="bx bx-user"></i>
              <span className="links_name">User</span>
            </a>
            <span className="tooltip">User</span>
          </li>
          <li>
            <a
              onClick={() => {
                setIsOpen(false);
                setOpenPanel(!openPanel);
              }}
            >
              <i className="bx bx-chat"></i>
              <span className="links_name">Chat</span>
            </a>
            <span className="tooltip">Chat</span>
          </li>

          <li>
            <a
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <i className="bx bx-cog"></i>
              <span className="links_name">Setting</span>
            </a>
            <span className="tooltip">Setting</span>
          </li>

          <li className="profile">
            <div className="profile-details">
              {/* <img src="profile.jpg" alt="profileImg"> */}
              <div className="name_job">
                <div className="name">{user.name}</div>
                <div className="job">{user.email}</div>
              </div>
            </div>
            <i
              className="bx bx-log-out cursor-pointer"
              id="log_out"
              onClick={handleLogout}
            />
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
