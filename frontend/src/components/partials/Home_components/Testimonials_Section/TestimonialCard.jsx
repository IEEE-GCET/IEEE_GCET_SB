import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import hero2 from "./hero2.jpg";
const TestimonialCard = ({ imgSrc = hero2, name, role, feedback }) => {
  return (
    <motion.div
      className="testimonial-card bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-between w-full sm:w-80 md:w-96 mx-auto relative z-10"
      initial={{ opacity: 0.3, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex justify-center mb-4">
        <span className="text-gray-400 text-5xl">“</span>
      </div>

      <img
        src={imgSrc}
        alt="Client"
        className="w-24 h-24 rounded-full mb-6 object-cover"
        style={{ border: "3px solid #00629B" }}
      />

      <p className="text-gray-600 text-lg mb-4 italic">{`"${feedback}"`}</p>
      <div className="mt-4 text-center">
        <p className="font-semibold text-xl">{name}</p>
        <p className="text-gray-500">{role}</p>
      </div>
      
      {/* Social Media Links for Testimonial */}
      {/* <div className="flex justify-center gap-4 mt-6">
        <motion.a
          href="#"
          className="text-[#009ca6] text-2xl hover:text-[#006c6a] transition-colors"
          whileHover={{ scale: 1.2 }}
        >
          <FaFacebook />
        </motion.a>
        <motion.a
          href="#"
          className="text-[#009ca6] text-2xl hover:text-[#006c6a] transition-colors"
          whileHover={{ scale: 1.2 }}
        >
          <FaTwitter />
        </motion.a>
        <motion.a
          href="#"
          className="text-[#009ca6] text-2xl hover:text-[#006c6a] transition-colors"
          whileHover={{ scale: 1.2 }}
        >
          <FaInstagram />
        </motion.a>
        <motion.a
          href="#"
          className="text-[#009ca6] text-2xl hover:text-[#006c6a] transition-colors"
          whileHover={{ scale: 1.2 }}
        >
          <FaLinkedin />
        </motion.a>
      </div> */}

      <div className="flex justify-center mt-4">
        <span className="text-gray-400 text-5xl">”</span>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
