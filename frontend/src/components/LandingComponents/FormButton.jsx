import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const FormButton = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

    const handleAuthClick = () => {
        const state = { showSignUp: true };
        if (email && isValidEmail(email)) {
          state.haveEmail = email;
        } else if (email) {
            alert('Please enter a valid email address.');
            return;
          }
        navigate('/auth', { state });
    };

    return(
        <div className="flex flex-row md:justify-start justify-center gap-5 mb-6">
            <form onSubmit={handleAuthClick} className='flex flex-row gap-x-5'>
                <input type="email" placeholder="Email" className="hidden sm:flex rounded-lg pl-5 max-w-72 "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="custom-button w-full sm:w-fit">
                    Get Started
                </button>
            </form>
        </div>
    )
};