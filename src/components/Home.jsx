import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import { account } from "../lib/appwrite";
import Navbar from "./Navbar";
import { useEffect } from "react";

const Home = () =>{
    const { user, setIsAuthenticated, clearUser} = useUserStore(); 
    const navigate = useNavigate();

    const handleLogout = async () => {
      try{
        await account.deleteSession('current');
        localStorage.removeItem("appwrite-session"); 
        clearUser();
        setIsAuthenticated(false);
        navigate('/');
      }catch(error){
        console.error("Logout error:", error);
      }
    }

    return(
      <>
        <Navbar isHome={true}/>
        <div className="relative mt-14">
            <h1>Welcome to the Home Page</h1>
            {user ? <p>Welcome back, {user.name}!</p> : <p>Please log in.</p>}
            <button
            type="button"
            onClick={handleLogout}
            >
            Logout
            </button>
        </div>
      </>
    )
}
export default Home;