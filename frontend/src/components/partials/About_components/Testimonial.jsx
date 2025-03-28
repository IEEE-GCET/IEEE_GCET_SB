import React from 'react'
import { motion } from 'framer-motion'
import princi from "./princi.png";


const Testimonial = () => {
  return (
    <motion.div
        className=" py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* Image */}
          <motion.div className="flex justify-center items-center">
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              src={princi}
              alt="Testimonial"
              className="rounded-lg w-[400px] shadow-lg"
            />
          </motion.div>

          {/* Quote */}
          <motion.div
            className="text-gray-700 px-8 md:px-0 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <span className="text-4xl text-[#00629B]">“</span>
            <em className="text-2xl font-serif">
              Everyday at IEEE GCET SB is an opportunity to innovate, learn, and
              connect with brilliant minds.
            </em>
            <span className="text-4xl mt-5 text-[#00629B]">“</span>
            <p className="mt-4 font-semibold">John Doe – Chairman</p>
          </motion.div>
        </div>
      </motion.div>
  )
}

export default Testimonial