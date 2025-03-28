import React from "react";

const IntroConcCard = ({title,content}) => {
  return (
    <>
      <div className="max-w-6xl mx-auto text-gray-800 flex flex-col">
        <div className="flex justify-start items-start">
          <h1 className="text-2xl font-semibold text-[#00629b] mb-4">
            {title}
          </h1>
        </div>
        <p className="px-5 mb-5 text-justify">
          {content}
        </p>
      </div>
    </>
  );
};

export default IntroConcCard;
