import React from "react";
import { motion } from "framer-motion";

// Helper Function: Validates if a description exists
const isValid = (text) => text && text.trim() !== "";

const DignitariesCard = ({ alldignitaries, title }) => {
  const dignitaries = alldignitaries.dignitaries;
  // console.log(dignitaries);
  return (
    <div className="max-w-7xl flex-col flex mx-auto p-6">
      <div className="flex justify-center items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-center">{title}</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex justify-around flex-col"
      >
        {/* Guests Section */}
        {dignitaries.guests?.length > 0 && (
          <div className="bg-gray-100 p-5 m-5 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-[#00629b] mb-4">Guests</h2>
            <ul className="list-disc pl-5 text-gray-700">
              {dignitaries.guests.map((guest, idx) => (
                <li key={idx} className="mb-2 list-none">
                  <span className="font-bold">{guest.name}</span> - {guest.designation}
                  {isValid(guest.description) && (
                    <p className="text-sm text-gray-600 mt-1 ml-2">{guest.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Resource Persons Section */}
        {dignitaries.resource_person?.length > 0 && (
          <div className="bg-gray-100 p-5 m-5 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-[#00629b] mb-4">Resource Persons</h2>
            <ul className="list-disc pl-5 text-gray-700">
              {dignitaries.resource_person.map((person, idx) => (
                <li key={idx} className="mb-2 list-none">
                  <span className="font-bold">{person.name}</span> - {person.designation}
                  {isValid(person.description) && (
                    <p className="text-sm text-gray-600 mt-1 ml-2">{person.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DignitariesCard;
