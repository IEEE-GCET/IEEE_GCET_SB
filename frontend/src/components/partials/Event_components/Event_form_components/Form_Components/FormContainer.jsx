import React from "react";

const FormContainer = ({ children, title = "Upload Event" }) => {
  return (
    <div className=''>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-300 via-green-500 to-green-700 p-4">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 mt-4 flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-center">{title}</h1>
          <p className="text-center text-lg">
            Fill in the details below to create an Upload Event.
          </p>
            {children}
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
