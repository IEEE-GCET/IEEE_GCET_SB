import React from "react";
import eventimg2 from "../../eventimg2.jpg";

const AssociationsCard = ({ title, affiliations, societies }) => {
  const length = affiliations.length + societies.length;
  const less = 0 <= length <= 4 ? true : false;
  return (
    <div
      className={`flex ${
        less ? "justify-around flex-wrap md:flex-nowrap " : "flex-col"
      } max-w-7xl mx-auto px-6 py-12`}
    >
      {/* Affiliations Section */}
      <div className="flex flex-col">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Affiliations
        </h2>
        <div
          key={title}
          className={`flex justify-center items-center flex-wrap gap-8 justify-items-center`}
        >
          {affiliations.map((affiliation, index) => (

              <div
                key={index}
                className={`flex flex-col items-center h-[100px] my-3 w-[200px] group transition-transform duration-300`}
              >
                {/* Image */}
                <div
                  className={`aspect-square object-contain  ${
                    affiliation.sponsership
                      ? "bg-[#00629b] shadow-lg shadow-[#00629b4b]"
                      : "bg-white"
                  } rounded-full shadow-lg flex items-center justify-center p-2 group-hover:scale-110`}
                >
                  <img
                    src={eventimg2}
                    alt={affiliation.organization}
                    className=" h-16  object-cover aspect-square rounded-full"
                  />
                </div>
                {/* Name */}
                <p className="mt-3 text-md font-semibold text-center">
                  {affiliation.organization}
                </p>
              </div>

          ))}
        </div>
      </div>
      {/* Societies Section */}
      <div className="flex flex-col items-center max-w-full">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center ${
            less ? "" : "mt-12"
          } mb-8`}
        >
          Societies
        </h2>
        <div
          className={`flex justify-center flex-wrap items-center gap-8 justify-items-center`}
        >
          {societies.map((society, index) => (
            <div
              key={index}
              className=" flex flex-col items-center h-[100px] my-3 w-[200px] group transition-transform duration-300"
            >
              {/* Image */}
              <div className="aspect-square object-contain bg-white rounded-full shadow-lg flex items-center justify-center p-2 group-hover:scale-110">
                <img
                  src={eventimg2}
                  alt={society.name}
                  className=" h-16  object-cover aspect-square rounded-full"
                />
              </div>
              {/* Name */}
              <p className="mt-3 text-md font-semibold text-center">
                {society.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AssociationsCard;
