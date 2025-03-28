import React from 'react'
import CountUp from 'react-countup';
import { motion } from "framer-motion";

const Statistics = () => {
  const stats = [
    { id: 1, end: 100, delay: 1, label: "Active Members" },
    { id: 2, end: 90, delay: 1.2, label: "Workshops Conducted" },
    { id: 3, end: 80, delay: 1.4, label: "Technical Events" },
    { id: 4, end: 100, delay: 1.6, label: "Collaboration Events" },
  ];
  return (
    <motion.div
    className="md:py-16 py-10 md:px-10 sm:px-5 px-2 text-center max-w-6xl mx-auto"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1, delay: 1 }}
  > 
      <h2 className="text-2xl font-semibold">IEEE GCET SB at a Glance</h2>
      <div className="flex mx-auto justify-around items-center mt-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            className="px-2 flex flex-col justify-center items-center"
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: `${stat.delay}` }}
          >
            <h3 className="md:text-4xl sm:text-3xl text-2xl font-bold text-[#00629B]">
              <CountUp start={0} end={stat.end} delay={stat.delay} duration={3} suffix="+" />
            </h3>
            <p className="text-gray-600 text-sm md:text-md lg:text-lg">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Statistics