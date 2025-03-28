import { motion } from "framer-motion";
import React from 'react'

const MainContent = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column - Title */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-semibold text-gray-900">
            IEEE GCET Student Branch
          </h2>
          <div className="w-16 h-1 bg-[#00629B] mt-4"></div>
        </motion.div>

        {/* Right Column - Description */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-lg text-gray-700 leading-relaxed"
        >
          <p>
            IEEE GCET SB is a premier student organization dedicated to
            advancing technology for humanity. We provide students with
            networking opportunities, technical workshops, and industry
            insights.
          </p>
          <p className="mt-6">
            Our mission is to empower students with the necessary skills to
            excel in the evolving tech world. We conduct seminars, hackathons,
            and collaborative projects that bridge the gap between academics and
            real-world applications.
          </p>
          <p className="mt-6">
            Join us and be part of a global community that is shaping the future
            of engineering and technology.
          </p>
        </motion.div>
      </div>
  )
}

export default MainContent