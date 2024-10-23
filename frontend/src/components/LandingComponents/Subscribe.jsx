import {FormButton} from "./FormButton";
import { footerLeft, footerRight } from "../../assets"

const Subscribe = () =>{
    return(
        <div className="relative animated-gradient w-full flex flex-row items-center justify-center md:justify-between h-[40vh] overflow-hidden">
            <div  className="hidden md:block">
                <img src={footerLeft}/>
            </div>
            <div className="flex flex-col gap-y-5">
                <h2 className="text-white text-3xl font-medium text-center">Get Started with Quip today</h2>
                <FormButton/>
            </div>
            <div  className="hidden md:block">
                <img src={footerRight}/>
            </div>
        </div>
    )
}
export default Subscribe;