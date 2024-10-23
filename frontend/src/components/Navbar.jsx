import { Link } from "react-router-dom"
import { pageData } from "./pageData"
import tempLogo from '../assets/images/templogo.svg'
import { useNavigate } from "react-router-dom"
import axios from "axios"

export function Navbar(){
    const navigate = useNavigate()
    function handleLogout(){
        sessionStorage.removeItem("User")
        delete axios.defaults.headers.common["Authorization"];
        navigate("/")
    }

    return(
        <div className="flex justify-around items-center">
            {pageData.map((page) => {
                return(
                    <Link to={page.path} key={page.path} calassName="navItem">
                        <button>
                            {page.name}
                        </button>
                    </Link>
                )
            })}
            <button onClick={handleLogout}>Log Out</button>
        </div>
    )
}
