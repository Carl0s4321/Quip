import { Outlet } from "react-router-dom";
// import  { Navbar } from "./Navbar"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./sidebar.css";
import Sidebar from "./Sidebar";
import useUserStore from "../store/UserStore";
import { jwtDecode } from "jwt-decode";
import Chats from "./ChatComponents/Chats";
import useSocketStore from "../store/SocketStore";

export function Layout() {
  const navigate = useNavigate();
  const { setUser, user } = useUserStore();
  const [openPanel, setOpenPanel] = useState(false);
  const { connectSocket, disconnectSocket, isConnected } = useSocketStore();

  useEffect(() => {
    const user_SS = sessionStorage.getItem("User");
    console.log(user_SS)
    if (!user_SS) {
      console.log('no user is set')
      disconnectSocket();
      navigate("/");
    } else {
      console.log(isConnected)
      console.log('connecting to a socket...')
      connectSocket();
      const decodedUser = jwtDecode(user_SS);
      setUser(decodedUser);
    }
    return () => {
      console.log('layout unmounting')
      disconnectSocket();
    };
  }, []);

  if (!user) {
    return <>Loading</>;
  }

  return (
    <>
      {/* <Navbar/> */}
      <div className="mx-10 md:mx-20">
        <div className="relative">
          <Sidebar openPanel={openPanel} setOpenPanel={setOpenPanel} />
          <Chats openPanel={openPanel} />
        </div>
        <section className="home-section p-5">
          <Outlet />
          {/* <div className="text">Dashboard</div> */}
        </section>
      </div>
    </>
  );
}
