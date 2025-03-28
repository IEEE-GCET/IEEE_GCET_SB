import mongoose from "mongoose";
import { Event } from "../models/eventModel.js";
import cloudinary from "../utils/cloudinary_multer_config.js";


const Schema = mongoose.Schema;

export const eventRegistration = async (req, res) => {
  try {
    const {
      title,
      organizedBy,
      guests,
      dignitaries,
      coordinators,
      affiliations,
      collaborated_societies,
      venue,
      description,
      images,
      collaboration,
      documents,
      editedBy,
      uploadedBy,
      winners,
    } = req.body;
    if (
      !title ||
      !organizedBy ||
      !dignitaries ||
      !coordinators ||
      !venue ||
      !description ||
      !editedBy
    ) {
      return res.status(400).json({
        message: "Please fill all the fields",
        success: false,
      });
    }
    let event = await Event.findOne({ title });
    if (event) {
      return res.status(400).json({
        message: "Event with current title already exists",
        success: false,
      });
    }
    event = await Event.create({
      title,
      organizedBy,
      guests,
      dignitaries,
      coordinators,
      affiliations,
      collaborated_societies,
      venue,
      description,
      images,
      winners,
      collaboration,
      documents,
      editedBy,
      uploadedBy,
    });
    return res.status(201).json({
      message: "Event uploaded successfully",
      success: true,
      data: event,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const validId = typeof eventId === 'string' && eventId.length === 24 && /^[0-9a-f]{24}$/.test(eventId);
    if (!validId) {
      return res.status(400).json({
        message: "Invalid event id",
        success: false,
      });
    }
    const event = await Event.findById(eventId)
      // .populate("uploadedBy")
      // .populate("collaborated_societies")
      // .populate("editedBy");

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Event found successfully",
      success: true,
      data: event

    });
  } catch (error) {
    console.error("Error fetching event:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false
    });
  }
};


export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .sort({ createdAt: -1 })
      .populate("uploadedBy")
      .populate("collaborated_societies")
      .populate("editedBy");
    if (!events) {
      return res.status(404).json({
        message: "Events not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Events found successfully",
      success: true,
      data: events,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    if (!Object.keys(req.body).length)
      return res.status(400).json({
        message: "Please change something to update",
        success: false,
      });
    const { eventId } = req.params;
    const {
      title,
      organizedBy,
      guests,
      dignitaries,
      coordinators,
      affiliations,
      collaborated_societies,
      venue,
      description,
      images,
      collaboration,
      documents,
      editedBy,
      uploadedBy,
      winners,
    } = req.body;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
        success: false,
      });
    }
    if (title) event.title = title;
    if (organizedBy) event.organizedBy = organizedBy;
    if (guests) event.guests = guests;
    if (dignitaries) event.dignitaries = dignitaries;
    if (coordinators) event.coordinators = coordinators;
    if (affiliations) event.affiliations = affiliations;
    if (collaborated_societies)
      event.collaborated_societies = collaborated_societies;
    if (venue) event.venue = venue;
    if (description) event.description = description;
    if (images) event.images = images;
    if (collaboration) event.collaboration = collaboration;
    if (documents) event.documents = documents;
    if (editedBy) event.editedBy = editedBy;
    if (uploadedBy) event.uploadedBy = uploadedBy;
    if (winners) event.winners = winners;
    await event.save();
    return res.status(200).json({
      message: "Event updated successfully",
      success: true,
      data: event,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



// Controller to handle multiple image uploads.


// Upload multiple images controller.
// controllers/imageController.js

export const uploadImages = async (req, res) => {
  const removeFileExtension = (filename) => {
    const lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex === -1) return filename; // No extension found
    return filename.substring(0, lastDotIndex);
  }
  const extractId = (publicId) => {
    const lastSlashIndex = publicId.lastIndexOf('/');
    if (lastSlashIndex === -1) return publicId; // If no slash exists, return the whole string.
    return publicId.substring(lastSlashIndex + 1);
  }

  // Example usage:

  console.log("Request files:", req.files);
  if (!req.files || req.files.length === 0) {
    console.log("No files uploaded");
    return res.status(400).json({ error: "No files uploaded" });
  }
  const FilesData = req.files.map((file) => {
    // console.log()
    return {
      file_name: removeFileExtension(file.originalname),
      link: file.path,
      public_id: extractId(file.filename),
      dirty: false,
    };

  });
  console.log("File data:", FilesData);

  res.status(201).json({
    data: FilesData,
    message: "Successfully Uploaded images"
  });
};


// export const uploadImages = async (req, res) => {
//   try {
//     if (!req.files || req.files.length === 0) {
//       console.log("No files uploaded");
//       return res.status(400).json({ error: "No files uploaded" });
//     }
//     console.log("Files uploaded:", req.files.length);

//     const uploadPromises = req.files.map((file) => {
//       return new Promise((resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           { folder: "events" },
//           (error, result) => {
//             if (error) {
//               return reject(error);
//             }
//             // Return the secure URL and public_id.
//             resolve({ url: result.secure_url, public_id: result.public_id });
//           }
//         );
//         // End the stream with the file's buffer.
//         uploadStream.end(file.buffer);
//       });
//     });

//     const uploadResults = await Promise.all(uploadPromises);
//     return res.status(200).json(uploadResults);
//   } catch (error) {
//     console.error("Upload error:", error);
//     return res.status(500).json({ error: "Server error during image upload" });
//   }
// };

export const deleteImage = async (req, res) => {
  try {
    const { publicId } = req.params;
    if (!publicId) {
      return res.status(400).json({ error: "No publicId provided" });
    }
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== "ok") {
      return res.status(500).json({ error: "Failed to delete image" });
    }
    return res.status(200).json({ message: "Image deleted", publicId });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({ error: "Server error during image deletion" });
  }
};
