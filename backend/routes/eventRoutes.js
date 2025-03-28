import Express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import cloudinaryConfig from "../utils/cloudinary_multer_config.js"; // This exports { cloudinary, storage }
import multer from "multer";

// Use the CloudinaryStorage from your config.
const upload = multer({ storage: cloudinaryConfig.storage });

import {
  eventRegistration,
  getEvent,
  getAllEvents,
  updateEvent,
  uploadImages,
  deleteImage,
} from "../controllers/eventController.js";

const Router = Express.Router();

Router.post("/register", isAuthenticated, eventRegistration);
Router.get("/all", getAllEvents);
Router.get("/:eventId", getEvent);
Router.put("/update/:eventId", isAuthenticated, updateEvent);
Router.post("/upload-images", isAuthenticated, upload.array("file", 10), uploadImages);
Router.get("/delete-images/:publicId", isAuthenticated, deleteImage);

export default Router;
