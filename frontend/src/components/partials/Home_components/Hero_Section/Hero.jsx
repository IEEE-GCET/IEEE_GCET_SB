import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import hero from "./hero3.jpg"; // Ensure you have an image here

const Hero = () => {
  return (
    <div className="relative w-[100%] h-[600px] z-[20] mx-auto mt-[4rem] rounded-xl overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-90 mt-16"
        style={{ backgroundImage: `url(${hero})` }}
      ></div>
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <section className="  flex flex-col justify-center items-start lg:px-28 px-10 gap-6 h-full text-white">
        {/* Heading */}
        <motion.h1
          data-aos="zoom-in"
          className="text-5xl md:text-6xl font-bold lg:pr-[500px] leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Transforming Ideas into Reality with Cutting-Edge Technology.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          data-aos="zoom-in"
          className="text-lg lg:pr-[500px] opacity-90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          We innovate, build, and create solutions that redefine the future. Join us in our journey to explore limitless possibilities.
        </motion.p>

        {/* Call-to-Action (CTA) Buttons */}
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 transition text-white font-semibold rounded-lg flex items-center gap-2">
            Get Started <ArrowRight size={18} />
          </button>
          <button className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition">
            Learn More
          </button>
        </motion.div>

        {/* Social Media Links */}
        <motion.div
          className="flex gap-4 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <a href="#" className="text-xl hover:text-blue-400">🔗 LinkedIn</a>
          <a href="#" className="text-xl hover:text-blue-400">📘 Facebook</a>
          <a href="#" className="text-xl hover:text-blue-400">📸 Instagram</a>
        </motion.div>
      </section>
    </div>
  );
};

export default Hero;
