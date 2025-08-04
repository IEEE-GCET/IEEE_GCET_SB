import React from "react";
import { motion } from "framer-motion";

const Slogan = () => {
  return (
    <section className="flex  items-center shadow-inner justify-center bg-white my-10 sm:rounded-full px-6 sm:px-12 md:px-16 lg:px-24 py-20 max-w-7xl mx-auto">
      <motion.div
        className="text-center max-w-3xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight flex"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span className="text-5xl">"</span>
          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
           className="mt-5">
            <p className="text-3xl sm:text-4xl font-bold text-gray-900 leading-relaxed">
    <span className="block mb-2">“ Dream, dream, dream. ”</span>
    <span className="block">Dreams transform into thoughts and thoughts result in action.”</span>
  </p>
          </motion.h1>
          <span className="text-5xl">"</span>
        </motion.div>

        <motion.p
          className="mt-6 text-lg sm:text-xl text-gray-700 italic"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}>
          — Dr. A.P.J. Abdul Kalam
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Slogan;
