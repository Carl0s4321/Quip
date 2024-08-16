import {styles} from '../styles'
import { logo } from '../assets';
import { Link } from 'react-router-dom';

const Navbar = () =>{
    return(
        <nav className={`${styles.paddingX} w-full h-14 flex items-center shadow-xl fixed top-0 z-20 bg-white`}>
            <div className="w-full flex justify-between items-center max-w-7xl mx-auto">

                <Link to="/" className="absolute left-1/2 transform -translate-x-1/2" 
                onClick={() => {
                    setActive("");
                    window.scrollTo(0,0);
                }}>
                <img src={logo} alt="logo" className="w-13 h-8 object-contain"/>
                </Link>

                <ul className="hidden sm:flex items-center list-none flex-row gap-10 ml-auto">
                    <li>Log in</li>
                    <li className='custom-button'>Sign up</li>
                </ul>

            </div>
                

    </nav>
    )
}
export default Navbar;
