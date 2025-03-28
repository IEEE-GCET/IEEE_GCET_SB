import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#00629B] text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section - Brand & Copyright */}
        <motion.div
          className="text-center flex flex-col justify-center items-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}>
          <h2 className="text-3xl font-bold">YourBrand</h2>
          <p className="text-sm opacity-90 mt-2">
            © {new Date().getFullYear()} All Rights Reserved.
          </p>
        </motion.div>

        {/* Center Section - Quick Links */}
        <motion.ul
          className="flex flex-wrap justify-center gap-6 text-lg font-medium"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}>
          {[
            { name: "Home", link: "/" },
            { name: "About", link: "/about" },
            { name: "Society", link: "/society" },
            { name: "Events", link: "/event" },
            { name: "Contact Us", link: "/contact" },
          ].map((item, index) => (
            <motion.li
              className="hover:underline hover:cursor-pointer"
              key={index}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "keyframes", stiffness: 300 }}
            >
              <Link to={item.link}>{item.name}</Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* Right Section - Subscribe & Social Media Links */}
        {/* <div className="text-center flex flex-col justify-center items-center md:flex-none   md:text-left"> */}
        {/* Subscribe Form */}
        {/* <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold">Subscribe to Our Newsletter</h3>
            <form className="flex mt-4 justify-center md:justify-start">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 rounded-l-md w-72"
              />
              <button type="submit" className="bg-white text-[#009ca6] p-2 rounded-r-md">Subscribe</button>
            </form>
          </motion.div>

          {/* Social Media Links */}

        {/* <motion.div
            className="flex gap-5 justify-center md:justify-start"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { icon: <FaFacebook size={24} />, link: "#" },
              { icon: <FaTwitter size={24} />, link: "#" },
              { icon: <FaInstagram size={24} />, link: "#" },
              { icon: <FaLinkedin size={24} />, link: "#" },
              { icon: <FaGithub size={24} />, link: "#" },
              { icon: <FaYoutube size={24} />, link: "#" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                className="p-2 rounded-full bg-white text-[#009ca6] hover:bg-opacity-80 transition"
                whileHover={{ scale: 1.2 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>*/}

      {/* Bottom Section - Contact Info */}
      <motion.div
        className="mt-12 text-center text-sm opacity-80"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}>
        <p>Contact Us: ieeegcetsb@ieee.org | +91 90309 07634</p>
      </motion.div>
    </footer>
  );
};

export default Footer;
