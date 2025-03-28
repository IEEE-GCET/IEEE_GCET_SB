import React, { useState, useEffect } from "react";

const SocietyCard = ({ name, image, description, count }) => {
  const isEven = count % 2 === 0; // Check if count is even or odd
  const fullDesc =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus dolorem ad provident consequatur, magnam recusandae quidem, quisquam esse molestias ipsam blanditiis minima perspiciatis. Iusto laboriosam consequuntur error fuga provident mollitia quibusdam possimus!";

  const [maxLength, setMaxLength] = useState(100); // Default character limit

  // Function to adjust character limit based on screen size
  const adjustCharacterLimit = () => {
    const width = window.innerWidth;
    if (width < 480) {
      setMaxLength(100); // Mobile screens
    } else if (width < 768) {
      setMaxLength(130); // Tablets
    } else if (width < 1024) {
      setMaxLength(180);
    } else {
      setMaxLength(200); // Larger screens
    }
  };

  useEffect(() => {
    adjustCharacterLimit(); // Adjust when component mounts
    window.addEventListener("resize", adjustCharacterLimit);

    return () => window.removeEventListener("resize", adjustCharacterLimit); // Cleanup listener
  }, []);

  // Truncate text based on maxLength
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className={`flex flex-col ${isEven ? 'bg-white':''} w-full  justify-center items-center`}>
      <div
        className={`md:h-[400px]  gap-x-8 flex md:max-w-5xl w-10/12 justify-center md:px-10 sm:px-6 md:py-6 sm:py-3 py-2 px-4 rounded-lg overflow-hidden my-2 md:my-6 lg:my-8 sm:my-4 `}
      >
        {/* Image */}
        <img
          className="rounded-lg shadow-lg m-auto md:w-[230px] sm:w-[150px] w-[100px] object-contain"
          src={image}
          alt={name}
        />

        {/* Content */}
        <div className="sm:p-4 p-2 flex flex-col md:mt-4 sm:mt-2">
          <h2 className="md:text-2xl sm:text-xl text-md text-[#00629B] font-semibold">
            {name}
          </h2>
          <div className="flex flex-col justify-between">
            <p className="text-gray-700 sm:text-sm xs:text-xs text-[10px] md:text-md mt-2">
              {truncateText(fullDesc, maxLength)}
            </p>
            <button
              className="mt-3 sm:mt-5 md:mt-7 
                    px-2 sm:px-3 md:px-4 
                    py-1 sm:py-2 md:py-2 
                    w-[80px] sm:w-[100px] md:w-28 
                    bg-[#00629B] text-white 
                    text-[10px] sm:text-xs md:text-sm 
                    rounded-lg hover:bg-[#215878] transition-all duration-300"
            >
              Know More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocietyCard;
