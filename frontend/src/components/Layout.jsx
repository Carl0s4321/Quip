import { Outlet } from "react-router-dom"
import  { Navbar } from "./Navbar"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export function Layout() {
    let user = sessionStorage.getItem("User")
    const navigate = useNavigate()

    useEffect(()=>{
        if(!user){
            navigate("/")
        }
    }, [user])

    return(
        <>
            <Navbar/>
            <div className="m-5 mx-10 md:mx-20">
                <Outlet/>
            </div>
        </>
    )
}