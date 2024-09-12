import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import WheelMenu from "./WheelMenu";
import { styles } from "../styles";
import { account} from '../lib/appwrite';

import BoardsList from "./BoardsList";
import { SectionWrapper } from "../hoc";
import UserPicture from "./UserPicture";
import Search from "./search";

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
        <div className={`${styles.padding}`}>
            <div className="flex flex-row w-full justify-between mb-2 pb-4 items-center">
              <div className="flex flex-col">
                <p className={`${styles.sectionHeadText}  mb-0 pb-0`}>Hello, {user?.name}</p>
                <p className={`${styles.sectionSubText} text-gray-500`}>Let's be productive & Quality today</p>
              </div>

              <div className='sm:hidden block w-14'>
                <UserPicture/>
              </div>

            </div>

            <Search placeholder="Search Boards..."/>

            <div className="mt-6">
            <BoardsList navigate={navigate}/>
            </div>

            <button
            type="button"
            onClick={handleLogout}
            >
            Logout
            </button>

            
        </div>
        {/* <WheelMenu/> */}
      </>
    )
}
export default SectionWrapper(Home,"");