import { useState } from "react"
import { CreateUser } from "../components/CreateUser"
import { LogIn } from "../components/LogIn"
import { authLeft, authRight } from "../assets";

export function Authentication() {
    const [isSignUp, setIsSignUp] = useState(true);
    return (
        <div className='mx-10 p-20 flex gap-x-20 h-[100vh] justify-center items-center'>
            <div className="flex  w-full h-full">
                <img className="w-full h-full" src={authLeft}/>
            </div>
            <div className={`grow shrink-0 h-14 container ${isSignUp ? 'active' : ''}`}>
                {/* <div className={`form-container ${isSignUp? 'sign-up' : 'sign-in'}`}>
                    {isSignUp? <CreateUser/> : <LogIn/>}
                </div> */}
                <div className="form-container sign-up">
                    <CreateUser />
                </div>
                <div className="form-container sign-in">
                    <LogIn />
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1 className="text-xl">Already have an account?</h1>
                            <button onClick={() => { setIsSignUp(false) }}>Sign In</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1 className="text-xl">Don't have an account?</h1>
                            <button onClick={() => { setIsSignUp(true) }}>Sign Up Here!</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-full h-full">
                <img className="w-full h-full" src={authRight}/>
            </div>
        </div>
    )
}