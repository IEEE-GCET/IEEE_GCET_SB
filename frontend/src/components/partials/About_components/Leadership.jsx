import React from 'react'
import { motion } from "framer-motion";
import sample from "./sample.jpeg";
const Leadership = () => {
    const leaders = [
        { id: 1, name: "John Doe", role: "Chairperson", image: sample },
        { id: 2, name: "Jane Smith", role: "Vice Chairperson", image: sample },
        { id: 3, name: "Alice Brown", role: "Treasurer", image: sample },
      ];
  return (
      
        <motion.div
          className="py-16 max-w-5xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-bold text-[#00629B]">Our Ex-Com Team</h2>
          <div className="flex md:flex-row flex-col justify-center gap-8 mt-8">
            {leaders.map((leader) => (
              <div key={leader.id} className=" flex flex-col justify-center items-center">
                <img src={leader.image} alt={leader.name} className="rounded-lg w-[250px] object-contain shadow-lg" />
                <h3 className="text-lg font-semibold mt-2">{leader.name}</h3>
                <p className="text-gray-600">{leader.role}</p>
              </div>
            ))}
          </div>
        </motion.div>
      );
}

export default Leadership