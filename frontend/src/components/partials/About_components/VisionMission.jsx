import React from 'react'
import { motion } from 'framer-motion'; 

const VisionMission = () => {
  return (
<>
  <motion.div
    className=" bg-gray-100 mx-auto w-full flex justify-center items-center "
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    <div className='py-16 text-center max-w-7xl flex  flex-col justify-center items-center md:px-20 lg:px-30 sm:px-10 px-5'>

    {/* Vision Section */}
    <div className="md:mt-8 sm:mt-4 mt-2 text-left max-w-3xl md:mx-10 sm:mx-5 mx-2 ">
    <h2 className="text-3xl md:text-4xl font-bold text-[#00629B]">Our Vision</h2>
      <p className="text-gray-700 mt-2 text-lg">
        To create a thriving community of innovative engineers and technologists who drive 
        meaningful advancements and contribute to a better future through research, collaboration, 
        and leadership.
      </p>
    </div>

    {/* Mission Section */}
    <div className="md:mt-8 sm:mt-4 mt-2 text-left max-w-3xl md:mx-10 sm:mx-5 mx-2 ">
    <h2 className="text-3xl md:text-4xl font-bold text-[#00629B]">Our Mission</h2>
      <p className="text-gray-700 mt-2 text-lg">
        To empower students by providing hands-on technical knowledge, leadership opportunities, 
        and a platform for innovation through workshops, events, mentorship, and industry collaborations.
      </p>
    </div>
    </div>
  </motion.div>
  </>
  )
}

export default VisionMission