import { useNavigate } from 'react-router-dom';

const FormButton = () => {
    const navigate = useNavigate();

    const handleAuthClick = () => {
        navigate('/auth', { state: { showSignUp: true } });
    };

    return(
        <div className="flex flex-row md:justify-start justify-center gap-5 mb-6">
            <input type="email" placeholder="Email" className="hidden sm:flex rounded-lg pl-5 max-w-72 flex-1"/>
            <button onClick={handleAuthClick} className="custom-button w-full sm:w-fit">
                Get Started
            </button>
        </div>
    )
}

export default FormButton