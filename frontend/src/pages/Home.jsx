import {jwtDecode} from "jwt-decode";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

export function Home() {
    // const [user, setUser] = useState(null);

    // useEffect(() => {
    //     function loadUserData(){
    //         const token = sessionStorage.getItem("User")
    //         setUser(jwtDecode(token))
    //     }   
    //     loadUserData();
    // }, [])



    return(
        <>
        <Sidebar/>
            {/* {user && (
               <div className="font-proxima">
                    Hi {user.name}
                </div>
            )}       */}
        </>
        )
}