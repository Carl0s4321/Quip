import { heropic, wave, wavemobile} from "../../assets";
import { styles } from "../../styles";
import { useState, useEffect } from "react";
import { FormButton } from "..";
import SignIn from "./SignIn"
import SignUp from "./SignUp"

const Hero = () =>{
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 640); 
        };
    
        window.addEventListener('resize', handleResize);
        handleResize(); // check screen size on initial render
    
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    return(
        <div className="relative animated-gradient w-full h-[90vh] flex justify-center items-center">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-20 place-items-center lg:mx-10">
                <div className="flex flex-col md:min-w-[500px] max-w-[688px] lg:pt-0 pt-32 px-8">
                    <h1 className={`${styles.heroHeadText} inline-block text-center md:text-left mb-2`}>Quip brings all your tasks, teammates, and tools together</h1>
                    <p className={`${styles.heroSubText} text-center md:text-left mb-6`}>Keep everything in the same place—even if your team isn’t.</p>
                    <FormButton/>
                </div>
                <div className="w-full flex justify-center relative z-10">
                    <img src={heropic} alt="Hero" className="max-w-[400px] sm:max-w-[500px] lg:max-w-[520px] xl:max-w-[630px] object-cover" />
                </div>
            </div>
            <img src={isMobile ? wavemobile : wave} className='absolute bottom-0 w-full  z-0'/>
        </div>
    )
}
export default Hero;