import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";
import eventimg3 from "../eventimg3.jpg"; // Ensure this image exists
import EventCoverCard from "./Event_cover_components/EventCoverCard";
import AssociationsCard from "./Event_cover_components/AssociationsCard";
import DignitariesCard from "./Event_cover_components/DignitariesCard";
import CoordinatorsCard from "./Event_cover_components/CoordinatorsCard";
import IntroConcCard from "./Content_Components/IntroConcCard";
import SectionCard from "./Content_Components/SectionCard";
import WinnerDisplay from "./Content_Components/WinnerDisplay";
import {setCurrentEvent,setAllEvents} from "../../../../features/eventSlice";
import {useSelector, useDispatch} from "react-redux";
import { use } from "react";

// Define animation variants
const zoomIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const slideLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const slideRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 1, ease: "easeOut" } 
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const EventViewCard = () => {
  const dispatch = useDispatch();
const curEvent = useSelector((state) => state.events.currentEvent);

  const { eventId } = useParams();
  const location = useLocation();

  const [event, setEvent] = useState(location.state || null);
  const [loading, setLoading] = useState(false);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!event && !hasFetchedRef.current) {
        hasFetchedRef.current = true;
        setLoading(true);
        try {
          const response = await axios.get(
            `http://localhost:3000/api/ieeegcetsb/event/${eventId}`,
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );

          if (response.data.success) {
            setEvent(response.data.data);
            console.log(response.data.data);
            dispatch(setCurrentEvent(response.data.data)); 
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message || "Failed to load event details.");
          }
        } catch (error) {
          console.error("Error fetching event details:", error);
          toast.error(
            error.response?.data?.message ||
              "An error occurred while fetching event details."
          );
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEventDetails();
  }, [eventId, event]);

  if (loading)
    return <p className="text-center mt-20 p-6">Loading event details...</p>;
  if (!event) return <p className="text-center mt-20 p-6">No event found.</p>;

  const {
    title,
    date = event.updatedAt,
    venue,
    image = eventimg3,
    affiliations,
    collaborated_societies,
    dignitaries,
    coordinators,
    description,
    winners,
    uploadedBy,
    editedBy,
  } = event || {};

  return (
    <div className="mt-16">
      {/* Event Cover Section */}
      {title && date && venue && image && uploadedBy && editedBy && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={zoomIn}
        >
          <EventCoverCard
            title={title}
            date={date}
            venue={venue}
            image={image || eventimg3}
            uploadedBy={uploadedBy}
            editedBy={editedBy}
          />
        </motion.div>
      )}

      {/* Affiliations & Societies Section */}
      {(affiliations?.length > 0 || collaborated_societies?.length > 0) && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideLeft}
        >
          <AssociationsCard
            title="Affiliations & Societies"
            affiliations={affiliations}
            societies={collaborated_societies}
          />
        </motion.div>
      )}

      {/* Dignitaries Section */}
      {dignitaries && (
        <>
          {dignitaries.guests?.length > 0 ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideRight}
            >
              <DignitariesCard alldignitaries={{ dignitaries }} title="Guests" />
            </motion.div>
          ) : (
            dignitaries.guests &&
            dignitaries.guests.length === 0 && (
              <p>No guests available for this event.</p>
            )
          )}
        </>
      )}

      {/* Coordinators Section */}
      {coordinators &&
        (coordinators.faculty?.length > 0 ||
          coordinators.students?.length > 0) && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideLeft}
          >
            <CoordinatorsCard coordinators={coordinators} />
          </motion.div>
        )}

      {/* Introduction Section */}
      {description?.introduction && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <IntroConcCard
            content={description.introduction}
            title="Introduction"
          />
        </motion.div>
      )}

      {/* Sections */}
      {description?.section?.length > 0 && (
        <div>
          {description.section.map((sec, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <SectionCard
                title={sec.title}
                context={sec.context}
                subSections={sec.sub_section}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Winners Section */}
      {winners?.length > 0 && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="max-w-6xl flex justify-center mx-auto items-center">
            <WinnerDisplay winners={winners} />
          </div>
        </motion.div>
      )}

      {/* Conclusion Section */}
      {description?.conclusion && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <IntroConcCard content={description.conclusion} title="Conclusion" />
        </motion.div>
      )}
    </div>
  );
};

export default EventViewCard;
