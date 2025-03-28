import React from "react";
import { motion } from "framer-motion";
import eventimg3 from "./eventimg3.jpg"; // Use your image file
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  // Fetch full event details when the card is clicked
  const handleClick = async (id) => {
        // Navigate to the event detail page and pass the full event data in state
        navigate(`/event/${id}`);
        console.log("done");
  }
  // Helper function to truncate text if needed
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <motion.div
      className="relative flex flex-col w-[350px] rounded-md hover:cursor-pointer hover:shadow-xl shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      whileHover={{ scale: 1.05 }}
      // Use the event's unique ID from event.data for fetching details.
      onClick={() => handleClick(event._id)}
    >
      <div className="w-full max-h-48 flex justify-center items-center bg-gray-100 overflow-hidden">
        <img
          src={eventimg3}
          alt={event.title}
          className="w-auto object-contain"
        />
      </div>

      {/* Overlay (purely visual) */}
      <motion.div
        className="absolute inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center text-white text-lg font-semibold"
        initial={{ opacity: 0  }}
        whileHover={{ opacity: 1,scale:1.3 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        View Event
      </motion.div>

      <motion.div
        className="p-5 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-lg text-[#00629B] font-semibold">
          {event.title}
        </h2>
        <p className="text-gray-700 text-sm mb-4">
          {truncateText(event.description?.introduction, 100)}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default EventCard;
