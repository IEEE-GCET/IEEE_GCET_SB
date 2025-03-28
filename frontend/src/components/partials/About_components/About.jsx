import React from "react";
import { motion } from "framer-motion";
import MainContent from "./MainContent.jsx";
import Testimonial from "./Testimonial.jsx";
import Statistics from "./Statistics.jsx";
import VisionMission from "./VisionMission.jsx";
import Leadership from "./Leadership.jsx";
// import Gallery from "./Gallery.jsx";
// import Membership from "./Membership.jsx";

const About = () => {
  return (
    <div className="bg-white max-w-full text-gray-900 flex flex-col">
      <motion.div
        className="bg-[#00629B] text-white text-center mt-16 py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-bold">About Us</h1>
      </motion.div>
      <MainContent />
      <Testimonial />
      <VisionMission />
      <Leadership />
      {/* <Gallery /> */}
      <Statistics />
      {/* <Membership /> */}
    </div>
  );
};

export default About;
