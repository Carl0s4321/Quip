import { heropic} from "../../assets";
import { styles } from "../../styles";
import { FormButton } from "./FormButton";
import "./landing.css";

const Hero = () => {

  return (

      <div className="relative animated-gradient w-full h-full flex flex-col justify-center items-center pt-10">
        <div className="lg:px-20 xl:px-28 w-full grid grid-cols-1 lg:grid-cols-2 place-items-center lg:mx-10">
          <div className="flex flex-col md:min-w-[500px] max-w-[688px] lg:pt-0 pt-8 md:pt-32 px-8">
            <h1
              className={`${styles.heroHeadText} inline-block text-center md:text-left mb-2`}
            >
              Quip brings all your tasks, teammates, and tools together
            </h1>
            <p
              className={`${styles.heroSubText} text-center md:text-left mb-6`}
            >
              Keep everything in the same place—even if your team isn’t.
            </p>
            <FormButton />
          </div>
          <div className="w-full flex justify-center relative z-10">
            <img
              src={heropic}
              alt="Hero"
              className="max-w-[400px] sm:max-w-[500px] lg:max-w-[520px] xl:max-w-[630px] object-cover"
            />
          </div>
        </div>

        <div className="w-full">
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="wave-parallax">
              <use
                href="#gentle-wave"
                x="48"
                y="0"
                fill="rgba(255,255,255,0.7)"
              />
              <use
                href="#gentle-wave"
                x="48"
                y="3"
                fill="rgba(255,255,255,0.5)"
              />
              <use
                href="#gentle-wave"
                x="48"
                y="5"
                fill="rgba(255,255,255,0.3)"
              />
              <use href="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
          </svg>
        </div>

        {/* <img src={isMobile ? wavemobile : wave} className='absolute bottom-0 w-full  z-0'/> */}
      </div>

  );
};

export default Hero;
