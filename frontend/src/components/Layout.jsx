import { Outlet } from "react-router-dom"
// import  { Navbar } from "./Navbar"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import "./sidebar.css"
import Sidebar from "./Sidebar"
import useUserStore from "../store/UserStore"
import { jwtDecode } from "jwt-decode"

export function Layout() {
    const navigate = useNavigate()
    const {setUser, user} = useUserStore()

    useEffect(() => {
        const user_SS = sessionStorage.getItem("User");
        if (!user_SS) {
          navigate("/");
        } else {
          const decodedUser = jwtDecode(user_SS);
          setUser(decodedUser); 
        }
      }, []);

    return(
        <>
            {/* <Navbar/> */}
            <div className="m-5 mx-10 md:mx-20">
                <Sidebar/>
                <section className="home-section">
                    <Outlet/>
                    {/* <div className="text">Dashboard</div> */}
                </section>
            </div>

        </>
    )
}