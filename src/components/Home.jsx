import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import WheelMenu from "./WheelMenu";
import { styles } from "../styles";
import { account} from '../lib/appwrite';

import BoardsList from "./BoardsList";

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
        <div className={`${styles.padding} bg-slate-700`}>
            <h1>Welcome to the Home Page</h1>
            <p>Welcome back, {user?.name}!</p>

            <BoardsList navigate={navigate}/>

            <button
            type="button"
            onClick={handleLogout}
            >
            Logout
            </button>

            
        </div>
        <WheelMenu/>
      </>
    )
}
export default Home;