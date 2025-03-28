import React, { useState, useEffect, useCallback } from "react";
import SubSectionCard from "./SubSectionCard";

import eventimg4 from "./eventimg4.png";
import image from "./image.png";
import eventimg1 from "./eventimg1.jpg";
import ImageView from "./ImageView"; // Modal component
import ImageCarousel from "./ImageCarousel";

const SectionCard = ({ title, context, subSections }) => {


  const images = [
    { link: image, title: "Subsection Image" },
    { link: eventimg4, title: "Subsection Image 2" },
    { link: eventimg1, title: "Subsection Image 3" },
  ];


  // Capture image dimensions and compute display size on load

  return (
    <div className="bg-white p-5 text-justify">
      <div className="flex flex-col items-center max-w-6xl mx-auto">
        <div className=" mx-auto text-gray-800 flex flex-col">
          <h1 className="text-2xl font-semibold text-[#00629b] mb-4">
            {title}
          </h1>
          <p className="px-5 mb-5 text-justify">{context}</p>
        </div>

        {/* Responsive Layout */}
        <div className="flex flex-col lg:flex-row-reverse w-full gap-8">
          {/* Image Carousel */}
          <div className="w-full lg:w-2/5 flex justify-center items-center">
          <ImageCarousel images={images} />
          </div>
          {/* SubSections */}
          <div
            className="w-full lg:w-3/5 lg:overflow-auto  lg:scrollbar-custom lg:h-[500px] lg:scrollable-element-thin" 
          >
            <div className="space-y-4 m-2">
              {subSections.length > 0 &&
                subSections.map((subSection, index) => (
                  <SubSectionCard key={index}  subSection={subSection} index={index} />
                ))}
            </div>
          </div>
        </div>
        {/* Image Modal */}
      </div>
    </div>
  );
};

export default SectionCard;
