import React from "react";
import { motion } from "framer-motion";
import { styles } from "../../styles";
import SectionWrapper from '../hoc/SectionWrapper'
import { fadeIn, textVariant } from "../../utils/motion";
import { testimonials } from "../../assets/constants/constants";
import { brands, brandsMobile} from '../../assets';

const TestimonialCard = ({
  index,
  testimonial,
  name,
  designation,
  image,
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className='bg-custom-testimonial-gradient p-10 rounded-3xl xs:w-[320px] w-full'
  >
    <p className='text-white font-black text-[48px]'>"</p>

    <div>
      <p className='text-white tracking-wider text-[18px]'>{testimonial}</p>

      <div className='mt-7 flex justify-between items-center gap-1'>
        <div className='flex-1 flex flex-col'>
          <p className='text-white font-medium text-[16px]'>
            <span className='blue-text-gradient'>@</span> {name}
          </p>
          <p className='mt-1 text-secondary text-[12px]'>
            {designation}
          </p>
        </div>

        <img
          src={image}
          alt={`feedback_by-${name}`}
          className='w-10 h-10 rounded-full object-cover'
        />
      </div>
    </div>
  </motion.div>
);

const Testimonials = () => {
  return (
    <>
    <div className={`pb-14 ${styles.paddingX} flex flex-wrap gap-7`}>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={testimonial.name} index={index} {...testimonial} />
        ))}
    </div>

    <motion.div variants={textVariant()}>
      <div className='flex flex-col items-center gap-y-10'>
        <p className="text-center text-xl">Join over 2,000,000 teams worldwide that are using Quip to get more done.</p>
        <div>
          <img src={brandsMobile} className="block sm:hidden" alt="Mobile Brand" />
          <img src={brands} className="hidden sm:block" alt="Brand" />
        </div>
      </div>
    </motion.div>
  </>
  );
};

export default SectionWrapper(Testimonials, "");
