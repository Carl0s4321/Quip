import { styles } from "../../styles";
import {SectionWrapper} from '../../hoc'
import { motion } from "framer-motion";
import { textVariant } from "../../utils/motion";

const About = () =>{
    return(
        <>
            <motion.div variants={textVariant}>
                <p className={`${styles.sectionSubText} text-primary`}>Quil 101</p>
                <h1 className={`${styles.sectionHeadText} text-primary`}>A productivity powerhouse</h1>
                <p className="max-w-xl text-lg">Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who’s doing what and what needs to get done. </p>

            </motion.div>
        </>
    )
}
export default SectionWrapper(About, "about");