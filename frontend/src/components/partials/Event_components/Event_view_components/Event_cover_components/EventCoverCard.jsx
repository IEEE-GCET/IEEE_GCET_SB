import React from "react";

// Example Usage:
const updOrEdtBy = (uploader, editor) => {
  if (uploader._id == editor._id)
    return `Uploaded and Edited by ${uploader.fullname}`;
  return `Uploaded by ${uploader.fullname} and Edited by ${editor.fullname}`;
};

const EventCoverCard = ({
  title,
  date,
  venue,
  description,
  image,
  uploadedBy,
  editedBy,
}) => {
  function timeAgo(postTimestamp) {
    const postDate = new Date(postTimestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - postDate) / 1000);

    if (diffInSeconds < 60) return "Just now";
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    // If more than a week ago, show formatted date (e.g., "Jan 30, 2025")
    return postDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  return (
    <div
      className="relative w-full h-[350px] md:h-[450px] bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${image})` }} // Dynamically set image prop
    >
      {/* Overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/50"></div>

      {/* Content */}
      <div className="relative px-4">
        {/* Blurred Background for Text */}
        <div className="p-6 rounded-lg inline-block">
          <h1 className="text-3xl mb-6 text-center md:text-5xl font-bold">
            <span className="font-mono text-7xl">"</span>
            {title}
            <span className="font-mono text-7xl">"</span>
          </h1>
          <div className="ml-40 flex justify-start items-start flex-col">
            <div>
              <p className="mt-2 text-lg md:text-xl font-medium">
                {description} {/* Dynamic event description */}
              </p>
              <p className="mt-4 text-md md:text-lg opacity-90">
                {timeAgo(date)} - <span>{updOrEdtBy(uploadedBy,editedBy)}</span> {/* Dynamic event date */}
              </p>
              <p className="mt-4">
                {venue} {/* Dynamic event venue */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCoverCard;
