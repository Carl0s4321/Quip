import { useState } from "react";
import { wheelMenuIcons } from "../assets/constants/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark} from "@fortawesome/free-solid-svg-icons";

import Draggable from "react-draggable";

const WheelMenu = () => {
    const [isActive, setIsActive] = useState(false);
    const [activePopup, setActivePopup] = useState(null);
    const radius = 100;

    
    const toggleMenu = () => {
      setIsActive(!isActive);
    };
    
    const handleIconClick = (index) => {
      toggleMenu();
      setActivePopup(index);
    };

    const calculatePosition = (index, total) => {
        // calc angle for the top-left quarter of a circle (90 to 180 deg)
        const startAngle = Math.PI / 2; // 90 degrees in radians
        const endAngle = Math.PI; // 180 degrees in radians

        // calc the step between each item
        const angleStep = (endAngle - startAngle) / (total - 1);

        // calc the current angle for the item depending on their index
        const angle = startAngle + (index * angleStep);

        // calc x and y using the radius
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        return { x, y };
    };

    return (
    <div className="absolute w-[60px] h-[60px] bottom-10 right-10">
      <div className="bg-lightBlue hover:bg-darkBlue flex justify-center items-center 
        cursor-pointer text-white text-2xl w-full h-full rounded-full 
        z-10 relative " onClick={toggleMenu}>
        <FontAwesomeIcon icon={isActive? faXmark : faBars}/>
      </div>
    

      {wheelMenuIcons.map((item, index) => {
        const { x, y } = calculatePosition(index, 3);
        const duration = 0.3 + index * 0.2;
        return (
          <div
            key={index}
            className="fab-option opacity-0 absolute bottom-2 w-[50px] h-[50px] rounded-full 
              text-white cursor-pointer bg-lightBlue hover:bg-darkBlue z-[9] flex items-center justify-center"
            style={{
              transform: isActive ? `translate(${x}px, ${-y}px)` : 'translate(0, 0)',
              opacity: isActive ? '1' : '0',
              transition: `transform ${duration}s ease, opacity ${duration}s ease`
            }}

            onClick={()=>{handleIconClick(index)}}
          >
            <FontAwesomeIcon className="w-1/2 h-1/2" icon={item.icon}/>
          </div>
        );
      })}

      {/* Popup Modal */}
      {activePopup !== null && (
        <Draggable>
          <div className="fixed inset-0 flex items-center justify-end z-20">

          <div className="bg-white p-4 rounded shadow-md w-[350px] h-[550px]">
            <h2 className="text-lg font-semibold">{wheelMenuIcons[activePopup].popupContent}</h2>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setActivePopup(null)} // Close the popup
              >
              Close
            </button>
          </div>
          </div>
        </Draggable>
      )}

    </div>
  );
}

export default WheelMenu;