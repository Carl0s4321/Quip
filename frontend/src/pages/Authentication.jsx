import { useState } from "react"
import { CreateUser } from "../components/CreateUser"
import { LogIn } from "../components/LogIn"

export function Authentication() {
    const [isSignUp, setIsSignUp] = useState(false);
    return (
        <div className='authWrapper'>
            <div className={`container ${isSignUp ? 'active' : ''}`}>
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
        </div>
    )
}