import {styles} from '../styles'
import { logo } from '../assets';
import { Link } from 'react-router-dom';

const Navbar = () =>{
    return(
        <nav className={`${styles.paddingX} w-full h-14 flex items-center shadow-xl fixed top-0 z-20`}>
            <div className="w-full flex justify-between items-center max-w-7xl mx-auto">

                {/* LOGO AND NAME */}
                <Link to="/" className="" 
                onClick={() => {
                    setActive("");
                    window.scrollTo(0,0);
                }}>
                <img src={logo} alt="logo" className="w-13 h-8 object-contain"/>
                </Link>

                {/* NAVBAR LINKS look at index.js */}
                <ul className="list-none hidden sm:flex self-center flex-row gap-10">
                    <li>Log in</li>
                    <li>Sign up</li>
                </ul>


                {/* MOBILE
                <div className='sm:hidden flex flex-1 justify-end items-center'>
                <img src={toggle ? close : menu} alt="menu" 
                    className='w-[28px] h-[28px] object-contain cursor-pointer' 
                    onClick={()=> setToggle(!toggle)}/>
                </div>

                <div className={`${!toggle ? 'hidden' : 'flex'} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
                <ul className="list-none flex justify-end items-start flex-col gap-4">
                    {navLinks.map((link) => (
                    <li
                        key={link.id}
                        className={`${
                        active === link.title
                            ? "text-white"
                            : "text-secondary"
                        } font-poppins text-[16px] font-medium cursor-pointer`}
                        onClick={()=> {
                        setActive(link.title);
                        setToggle(!toggle);
                        }}
                    >
                        <a href={`#${link.id}`}>{link.title}</a>
                    </li>
                    ))}
                </ul>
                </div> */}

            </div>
                

    </nav>
    )
}
export default Navbar;
