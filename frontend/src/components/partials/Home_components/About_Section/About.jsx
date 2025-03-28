import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import about from "./about.png"; // Ensure correct path
import { Link } from "react-router-dom";

const About = () => 
{
  return (
    <section className="mx-auto px-6 sm:px-12 md:px-16 z-10 lg:px-24 py-20 max-w-7xl">
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center z-15 md:w-1/2">
          <img
            src={about}
            alt="About Us"
            className= "w-full max-w-[350px] md:max-w-[400px] lg:max-w-[450px] object-contain shadow-xl" />
        </motion.div>
        {/* Text Section */}
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 tracking-wide mb-6">
            About Us
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6">
            We are committed to pushing the boundaries of innovation and
            delivering solutions that shape the future. Join us on this journey
            to redefine possibilities with cutting-edge technology.
          </p>
          {/* Animated Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#00629B] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#00629be9] transition-all">
            <Link to="/about">Know More</Link>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;