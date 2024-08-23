import React, { useState } from 'react';
import { account, ID } from '../../lib/appwrite';
import { useLocation, useNavigate} from 'react-router-dom';
import useUserStore from '../../store/userStore';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const { haveEmail } = location.state || {};
  const {showSignUp} = location.state || {showSignUp: false}
  const [isSignUp, setIsSignUp] = useState(showSignUp);

  const [isLoading, setIsLoading] = useState(false); // Loading state

  const [email, setEmail] = useState(haveEmail || '');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  async function login(email, password) {
    await account.createEmailPasswordSession(email, password);
    setUser(await account.get());
  }

  return (
    <div className='flex justify-center items-center h-[85vh] flex-col'>
    <div className={`container ${isSignUp ? 'active' : ''}`}>
      <div className={`form-container ${isSignUp ? 'sign-up' : 'sign-in'}`}>
        {isSignUp ? (
          <form>
            <h1 className='text-2xl font-semibold'>Create Account</h1>
            {/* <div className="social-icons">
              <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registration</span> */}
            <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required/>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required/>
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required/>
            <button
                type="button"
                onClick={async () => {
                    await account.create(ID.unique(), email, password, name);
                    login(email, password);
                    navigate('/home'); 
                }}
                >Sign Up</button>
          </form>
        ) : (
          <form>
            <h1  className='text-2xl font-semibold'>Log In</h1>
            {/* <div className="social-icons">
              <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span>or use your email password</span> */}
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required/>
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required/>
            {/* <a href="#">Forget Your Password?</a> */}
            <button 
              type="button" 
              onClick={() => {
                login(email, password);
                navigate('/home');
              }}
              >Log In</button>
          </form>
        )}
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Already have an account?</h1>
            <button className="block" onClick={() => setIsSignUp(false)}>Log In here!</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>New to Quip?</h1>
            <button className="block" onClick={() => setIsSignUp(true)}>Sign up here!</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default Auth;
