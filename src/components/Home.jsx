import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import { account } from "../lib/appwrite";
import Navbar from "./Navbar";
import { useEffect } from "react";

const Home = () =>{
    const { user, setUser} = useUserStore(); 
    const navigate = useNavigate();
    const { clearUser } = useUserStore(); 

    // useEffect(() => {
    //   if (!user) {
    //     // fallback if global state isnt working:
    //     // call appwrite api then set it as global state
    //     // if any error then catch and logout, go back to login page
    //     account.get().then(setUser).catch(() =>{
    //       // logout
    //     })
    //   }
    // }, []);

    useEffect(() => {
      const checkSession = async () => {
        console.log(user)
        if (!user) { // If user is not set in state, check session
          console.log('a')
          try {
            const fetchedUser = await account.get();
            setUser(fetchedUser);
          } catch (error) {
            console.log('No active session:', error);
          }
        }
      };
  
      checkSession();
    }, []);

    return(
      <>
        <Navbar isHome={true}/>
        <div className="relative mt-14">
            <h1>Welcome to the Home Page</h1>
            {user ? <p>Welcome back, {user.name}!</p> : <p>Please log in.</p>}
            <button
            type="button"
            onClick={async () => {
                await account.deleteSession('current');
                clearUser();
                navigate('/');
            }}
            >
            Logout
            </button>
        </div>
      </>
    )
}
export default Home;