import { useState } from "react";

const WheelMenu = () => {
    const [isActive, setIsActive] = useState(false);
    const radius = 100;

    const toggleMenu = () => {
        setIsActive(!isActive);
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
      <div className="bg-lightBlue flex justify-center items-center cursor-pointer text-white w-full h-full rounded-full" onClick={toggleMenu}>
        &#9776;
      </div>
      <div>
      {/* Array(2) -> [empty,empty] */}
      {/* ...Array(2) -> [undefined,undefined] */}
      {[...Array(3)].map((_, index) => {
        const { x, y } = calculatePosition(index, 3);
        return (
          <div
            key={index}
            className="fab-option opacity-0 absolute bottom-2 w-[50px] h-[50px] rounded-full bg-lightBlue"
            style={{
              transform: isActive ? `translate(${x}px, ${-y}px)` : 'translate(0, 0)',
              opacity: isActive ? '1' : '0',
            }}
          ></div>
        );
      })}

      </div>
    </div>
  );
}

export default WheelMenu;