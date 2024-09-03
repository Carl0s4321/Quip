import React, { useState } from 'react';
import { account, ID, databases, USERPROFILES_ID, DATABASE_ID} from '../../lib/appwrite';
import { useLocation, useNavigate} from 'react-router-dom';
import useUserStore from '../../store/userStore';
import { AppwriteException } from 'appwrite';
import { authLeft, authRight } from '../../assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { PropagateLoader } from 'react-spinners';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated, clearUser } = useUserStore();
  const { haveEmail } = location.state || {};
  const {showSignUp} = location.state || {showSignUp: false}
  const [isSignUp, setIsSignUp] = useState(showSignUp);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [email, setEmail] = useState(haveEmail || '');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

    
  const login = async(email, password) => {
    try{
      const response = await account.createEmailPasswordSession(email, password);
      const user = await account.get();

      setUser(user);
      setIsAuthenticated(true);

      localStorage.setItem("appwrite-session", JSON.stringify(response));

    } catch(error){
      localStorage.removeItem("appwrite-session");
      clearUser();
      setIsAuthenticated(false);
      throw error;
    }
  }

  const handleLogIn = async() => {
    setIsSubmitting(true);
    try{
      await login(email, password);
      navigate('/home');  
    }catch(error){
      handleAppwriteException(error);
    }finally{
      setIsSubmitting(false);
    }
  }

  const handleSignUp = async() => {
    setIsSubmitting(true);
    try{
      const response = await account.create(ID.unique(), email, password, name);
      const userId = response.$id;
      
       // store userId in database
      databases.createDocument(
        DATABASE_ID,
        USERPROFILES_ID,
        userId,
        { "userId": userId }
      );


      await login(email, password);
      navigate('/home');  
    }catch(error){
      handleAppwriteException(error);
    }finally{
      setIsSubmitting(false);
    }
  }

  const handleAppwriteException = (error) =>{
    if(error instanceof AppwriteException){
      switch (error.code) {
        case 401:
          alert('Unauthorized. Please check your email and password.');
          break;
        case 409:
          alert('Conflict. The account already exists.');
          break;
        case 400:
          alert('Bad Request. Please ensure all fields are filled out correctly.');
          break;
        default:
          alert(`Error: ${error.message}`);
      }
    }else{
      alert(error);
      // alert('An unexpected error occurred. Please try again.');
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogIn();
    }
  };

  return (
    <>
    <FontAwesomeIcon icon={faArrowLeft} className='p-5 cursor-pointer'onClick={()=>{navigate('/')}}/>
    <div className='flex justify-center items-center h-[85vh]'>
      <div className='w-1/4 h-1/4 absolute left-0'>
        <img src={authLeft}/>
      </div>
      <div className={`container ${isSignUp ? 'active' : ''}`}>
        <div className={`form-container ${isSignUp ? 'sign-up' : 'sign-in'}`}>
          {isSignUp ? (
            <form>
              <h1 className='text-2xl font-semibold'>Create Account</h1>
              <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required/>
              <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required/>
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required/>
              <button
                  type="button"
                  onClick={handleSignUp}>Sign Up</button>
            </form>
          ) : (
            <form>
              <h1  className='text-2xl font-semibold'>Log In</h1>
              <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required onKeyDown={handleKeyDown}/>
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required onKeyDown={handleKeyDown}/>
              <button 
                type="button" 
                onClick={handleLogIn} className='flex'>
                  {isSubmitting?<PropagateLoader className='flex items-center justify-center p-4 px-20' color={"#fff"}/>:"Log In"}
              </button>
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
      <div className='w-1/4 h-1/4 absolute right-0'>
        <img src={authRight}/>
      </div>
  </div>
  </>
);
};

export default Auth;
