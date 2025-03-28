import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import EventCard from "./EventCard";
import { setAllEvents } from "@/features/eventSlice";

const Event = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const allEvents = useSelector((state) => state.events.allEvents);
  // Fetch all events when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/ieeegcetsb/event/all",
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (response.data.success) {
          // Assuming your API returns an array of event objects in response.data.data
          setEvents(response.data.data);
          dispatch(setAllEvents(response.data.data));
          console.log(response.data.data);

        } else {
          toast.error(response.data.message || "Failed to fetch events.");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        toast.error("Error fetching events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p className="p-6 text-center">Loading events...</p>;
  console.log(allEvents[0]._id)
  if (allEvents.length === 0)
    return <p className="p-6 text-center">No events found.</p>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 mt-16 py-10 px-5">
      <h1 className="text-3xl font-bold text-center mb-8">Upcoming Events</h1>
      <div className="grid gap-y-6 gap-x-10  lg:grid-cols-2 xl:grid-cols-3 max-w-6xl mx-auto">
        {allEvents.map((event) => (
          // Use the unique event id from event.data as the key.
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Event;
