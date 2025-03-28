import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules"; // Import modules from swiper/modules
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";


const SubSectionCard = ({ subSection,index }) => {
  return (
    <div
    key={index}
    className="bg-gray-100 p-4 rounded shadow"
  >
    <h2 className="text-lg mb-1 font-semibold">
      {subSection.title}
    </h2>
    <p className="text-sm pl-2 text-gray-700">
      {subSection.context}
    </p>
  </div>
      ); 
};

export default SubSectionCard;
