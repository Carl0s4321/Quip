import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./sidebar.css";
import Sidebar from "./Sidebar";
import useUserStore from "../store/UserStore";
import { jwtDecode } from "jwt-decode";
import Chats from "./ChatComponents/Chats";
import useSocketStore from "../store/SocketStore";
import auth from "../utils/auth";

export function Layout() {
  const navigate = useNavigate();
  const { setUser, user } = useUserStore();
  const [openPanel, setOpenPanel] = useState(false);
  const { connectSocket, disconnectSocket } = useSocketStore();

  useEffect(() => {
    const handleTokenChange = () => {
      const userToken = auth.getToken();
      if (!userToken) {
        disconnectSocket();
        navigate("/");
        return;
      }
  
      connectSocket();
      const decodedUser = jwtDecode(userToken);
      setUser(decodedUser);
    };
  
    handleTokenChange();
  
    window.addEventListener("tokenChange", handleTokenChange);
  
    return () => {
      window.removeEventListener("tokenChange", handleTokenChange);
      disconnectSocket();
    };
  }, []);

  if (!user) {
    return <>Loading</>;
  }

  return (
    <>
      <div className="mx-10 md:mx-20">
        <div className="relative">
          <Sidebar openPanel={openPanel} setOpenPanel={setOpenPanel} />
          <Chats openPanel={openPanel} />
        </div>
        <section className="home-section p-5">
          <Outlet />
        </section>
      </div>
    </>
  );
}
