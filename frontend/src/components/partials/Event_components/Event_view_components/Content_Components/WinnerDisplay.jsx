import React from "react";

const WinnerDisplay = ({ winners }) => {
  // Helper function to return classes based on winner's position.
  const getMedalClasses = (position) => {
    // Convert position to string in case it's passed as a number.
    const pos = position;
    switch (pos) {
      case "1":
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-lg border-2 border-yellow-700";
      case "2":
        return "bg-gradient-to-r from-gray-300 to-gray-400 shadow-lg border-2 border-gray-600";
      case "3":
        return "bg-gradient-to-r from-orange-300 to-orange-500 shadow-lg border-2 border-orange-600";
      default:
        return "bg-gray-200 shadow-md border-2 border-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h2 className="text-4xl font-bold text-center text-gray-700 mb-10">
        Winners 🏆
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        {winners.map((winner, index) => {
          // Destructure winner data for clarity.
          const { title, position, participants } = winner;
          return (
            <div
              key={`${position}-${index}`}
              className={`relative p-6 w-full max-w-md h-[220px] rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 ${getMedalClasses(
                (index + 1).toString()
              )}`}
            >
              {/* Content */}
              <div className="relative z-10 text-center text-white">
                <h3 className="text-3xl font-bold mb-4">{title}</h3>
                <ul className="space-y-1">
                  {participants.map((participant, pIndex) => (
                    <li key={pIndex} className="text-lg text-gray-200">
                      {participant.name} - {participant.dept} (Year:{" "}
                      {participant.year})
                    </li>
                  ))}
                </ul>
              </div>

              {/* Inner shadow overlay for a shining effect */}
              <div className="absolute inset-0 rounded-lg pointer-events-none bg-black opacity-10" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WinnerDisplay;
