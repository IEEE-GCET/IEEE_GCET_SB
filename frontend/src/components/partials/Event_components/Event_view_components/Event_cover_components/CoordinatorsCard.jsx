import React from "react";
import { motion } from "framer-motion";

// Sample Coordinators Data


// Function to get proper superscript for years
const getYearWithSuperscript = (year) => {
  const suffixes = { 1: "st", 2: "nd", 3: "rd", 4: "th" };
  return (
    <>
      {year}
      <sup>{suffixes[year] || "th"}</sup>
    </>
  );
};

const CoordinatorsCard = ({ coordinators }) => {
  // Sorting students by year (descending order)
  const sortedStudents = [...coordinators.students].sort(
    (a, b) => b.year - a.year
  );

  return (
    <div className="max-w-7xl flex-col flex mx-auto p-6">
      {/* Title */}
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold text-[#00629b]">
          Event Coordinators
        </h1>
      </div>

      {/* Motion Div Container */}
      {(coordinators.faculty.length > 0 || sortedStudents.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between w-full"
        >
          {/* Faculty Coordinators Section */}
          {coordinators.faculty.length > 0 && (
            <div className="bg-gray-100 p-5 rounded-lg shadow-md w-full md:w-[45%] h-[300px] m-5 flex flex-col">
              <h2 className="text-2xl font-semibold text-[#00629b] mb-4 text-center">
                Faculty
              </h2>
              <ul className="list-disc pl-5 text-gray-700 flex-grow overflow-auto">
                {coordinators.faculty.map((faculty, idx) => (
                  <li key={idx} className="mb-2 list-none">
                    <span className="font-bold">{faculty.name}</span> -{" "}
                    <i className="font-medium text-gray-500 text-sm">
                      {faculty.designation}
                    </i>
                    <p className="text-sm text-gray-600 mt-1 ml-2">
                      {faculty.dept} Department, GCET
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Student Coordinators Section (Sorted by Year) */}
          {sortedStudents.length > 0 && (
            <div className="bg-gray-100 p-5 rounded-lg shadow-md w-full md:w-[45%] m-5 h-[300px] flex flex-col">
              <h2 className="text-2xl font-semibold text-[#00629b] mb-4 text-center">
                Student
              </h2>
              <ul className="list-disc pl-5 text-gray-700 flex-grow overflow-auto">
                {sortedStudents.map((student, idx) => (
                  <li key={idx} className="mb-2 list-none">
                    <span className="font-bold">{student.name}</span>
                    <span>
                      <i className="font-medium text-gray-500 text-sm">
                      {" - "}{getYearWithSuperscript(student.year)} Year
                      </i>
                    </span>
                    <p className="text-sm text-gray-600 mt-1 ml-2">
                      {student.dept} Department, GCET
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default CoordinatorsCard;
