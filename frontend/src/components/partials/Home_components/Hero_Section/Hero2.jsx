import React, { useState } from "react";
import heroImage from "./hero3.jpg"; // Ensure you have an image here
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ReactTyped } from "react-typed";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const Hero2 = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="flex items-center justify-around">
      <div
        className="min-h-screen pt-10 w-full flex flex-row justify-between bg-center items-center lg:px-20 sm:px-10 px-5 bg-cover bg-no-repeat "
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="flex flex-col justify-center items-start  lg:pr-28 md:pr-20 px-0 gap-6 h-full text-white">
          <motion.h1
            data-aos="zoom-in"
            className=" sm:text-4xl text-3xl md:text-5xl  font-bold lg:pr-[500px] leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Transforming Ideas into Reality with Cutting-Edge Technology.
            <div className="py-3">
              <ReactTyped
                className=""
                strings={[
                  "IEEE SB",
                  "SSIT",
                  "NTC",
                  "CAS",
                  "SPS",
                  "CS",
                  "PES",
                  "............",
                ]}
                typeSpeed={180}
                backSpeed={80}
                loop
              />
            </div>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            data-aos="zoom-in"
            className="sm:text-lg text-sm lg:pr-[500px] opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            We innovate, build, and create solutions that redefine the future.
            Join us in our journey to explore limitless possibilities.
          </motion.p>

          {/* Call-to-Action (CTA) Buttons */}
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.button
              className="sm:px-4 px-3 h-[35px] py-0.5 sm:py-1 md:py-3 bg-[#00629B] hover:bg-[#215878] transition text-white font-semibold rounded-lg flex items-center sm:text-[12px] text-[9px]  md:text-sm gap-x-2"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Learn More
              <motion.div
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight size={18} />
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Social Media Links */}
          <motion.div
            className="flex gap-x-10 gap-y-3 object-contain justify-center items-center flex-wrap md:flex-nowrap mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
             {[
                          { icon: <FaFacebook  />, link: "#",name:"Facebook" },
                          { icon: <FaTwitter />, link: "#",name:"Twitter" },
                          { icon: <FaInstagram size={20} />, link: "#",name:"Instagram" },
                          { icon: <FaLinkedin size={20} />, link: "#",name:"LinkedIn" },
                          // { icon: <FaGithub size={20} />, link: "#",name:"Git Hub" },
                          // { icon: <FaYoutube size={20} />, link: "#",name:"Youtube" },
                        ].map((social, index) => (
                          <motion.a
                            key={index}
                            href={social.link}
                            className=" rounded-full flex justify-center items-center gap-2  text-[#00629B] hover:bg-opacity-80 transition"
                            whileHover={{ scale: 1.2 }}
                          >
                            <div className="bg-white  rounded-full inline-block p-1 " >{social.icon}</div> <span className="text-sm text-white">{social.name}</span>
                          </motion.a>
                        ))}
            {/* <a href="#" className="sm:text-xl gap-2 flex flex-between text-sm hover:text-[#009ca6]">
              <FaFacebook/> <span className="hover:border-b hover:border-[#009ca6]" >LinkedIn</span>
            </a>
            <a href="#" className="sm:text-xl flex flex-between gap-2 text-sm hover:text-[#009ca6]">
              📘 <span className="hover:border-b hover:border-[#009ca6]" >Face Book</span>
            </a>
            <a href="#" className="sm:text-xl flex flex-between gap-2 text-sm hover:text-[#009ca6]">
              📸 <span className="hover:border-b hover:border-[#009ca6]" >Instagram</span>
            </a> */}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero2;
