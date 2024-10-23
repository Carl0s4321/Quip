import {jwtDecode} from "jwt-decode";
import { useEffect, useState } from "react";
import { getGeoCoordinates } from "../src/api";

export function Home() {
    // const [user, setUser] = useState(null);

    // useEffect(() => {
    //     function loadUserData(){
    //         const token = sessionStorage.getItem("User")
    //         setUser(jwtDecode(token))
    //     }   
    //     loadUserData();
    // }, [])

    function handleClick(){
        const response = getGeoCoordinates('Edmonton Trail NE')
        if(response.success){
            console.log('returned', response)
        }else{
            console.error(response)
        }
    }



    return(
        <>

               <div className="font-proxima">
                    Hi
                </div>
                <button onClick={handleClick}>click me</button>
            {/* {user && (
               <div className="font-proxima">
                    Hi {user.name}
                </div>
            )}       */}
        </>
        )
}