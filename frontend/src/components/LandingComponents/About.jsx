import { styles } from "../../styles";
import { motion } from "framer-motion";
import { textVariant, fadeIn } from "../../utils/motion";
import { cards } from "../../assets/constants/constants";
import { useEffect, useState } from "react";
import SectionWrapper from "../hoc/SectionWrapper";

const CardItem = ({ data, isActive, onMouseEnter, index }) =>{
  const borderColor = isActive ? data.color : 'black';

    return(
      <motion.div
      variants={fadeIn("", "spring", index * 0.2, 0.75)}>
        <div        
        style={{
          borderColor: borderColor,
        }}
        className={`card-item border-4 border-black shadow-[0.5rem_0.5rem] overflow-hidden h-[350px] flex rounded-2xl flex-col gap-4 p-3 items-center cursor-pointer transition-all duration-500 ease-in-out ${
          isActive ? `w-[350px] ` : 'w-[125px]'
        }`}
        onMouseEnter={onMouseEnter}
      >
            <div style={{borderColor: data.color}} className={`transition-all duration-500 ease-in-out ${isActive? "flex-row items-start h-auto":"flex-col items-center h-full"} border-4 rounded-2xl flex w-full`}>
              <div className={`transition-all duration-200 ease-in-out ${isActive? "w-20 h-20": "w-10 h-10"} flex items-center justify-center m-5`}>
                <img className="w-full object-cover" src={`${data.icon}`}/>
              </div>
              <div style={{backgroundColor: data.color}} className={`${isActive? "flex items-center":""}  h-full w-full`}>
                <h2 className={`transition-all duration-700 ease-in-out ${isActive? "rotate-0 pl-2" : "rotate-90 pl-10"} text-xl md:text-2xl font-semibold`}>{data.title}</h2>
              </div>
            </div>
            <div className={`${isActive? "block" : "hidden"}`}>
              <p>{data.subtitle}</p>
            </div>
        </div>

      </motion.div>
    )

}

const About = () =>{
    // const width = window.innerWidth;
    const [activeCard, setActiveCard] = useState(null); 

    useEffect(() => {
      const cardsElements = document.querySelectorAll(".card-item");
  
      
      cardsElements.forEach((card, index) => {
        card.classList.remove('active');
        if (index === activeCard) {
          card.classList.add('active');
        }
      });
  
    }, [activeCard]); // trigger effect every activeCard changes

    return(
        <>
            <motion.div variants={textVariant()}>
                <p className={`${styles.sectionSubText} text-primary`}>Quip 101</p>
                <h1 className={`${styles.sectionHeadText} text-primary`}>A productivity powerhouse</h1>
                <p className="max-w-xl text-lg">Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who’s doing what and what needs to get done. </p>

            </motion.div>
            <div className=" my-8 w-full h-auto flex gap-8 justify-center flex-row flex-wrap md:flex-nowrap" onMouseLeave={() => setActiveCard(null)}>
                {cards.map((card, index) => (
                     <CardItem
                     key={index}
                     data={card}
                     isActive={index === activeCard}
                     onMouseEnter ={() => setActiveCard(index)}
                     index={index}
                   />
                ))}
            </div>
        </>
    )
}
export default SectionWrapper(About,"");