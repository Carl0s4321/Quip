import { Outlet } from "react-router-dom";
// import  { Navbar } from "./Navbar"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./sidebar.css";
import Sidebar from "./Sidebar";
import useUserStore from "../store/UserStore";
import { jwtDecode } from "jwt-decode";
import Chat from "./ChatComponents/Chat";

export function Layout() {
  const navigate = useNavigate();
  const { setUser, user } = useUserStore();
  const [openPanel, setOpenPanel] = useState(false);

  useEffect(() => {
    const user_SS = sessionStorage.getItem("User");
    if (!user_SS) {
      navigate("/");
    } else {
      const decodedUser = jwtDecode(user_SS);
      setUser(decodedUser);
    }
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
          <Chat openPanel={openPanel}/>
        </div>
        <section className="home-section p-5">
          <Outlet />
          {/* <div className="text">Dashboard</div> */}
        </section>
      </div>
    </>
  );
}
