import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import { account } from "../lib/appwrite";
const Home = () =>{
    const { user } = useUserStore(); 
    const navigate = useNavigate();
    const { clearUser } = useUserStore(); 
    return(
        <div>
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
    )
}
export default Home;