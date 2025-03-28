import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getAllSocieties,
  getSociety,
  societyRegistration,
  updateSociety,
} from "../controllers/societyController.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, societyRegistration);
router.route("/all").get(isAuthenticated, getAllSocieties);
router.route("/:societyId").get(isAuthenticated, getSociety);
router.route("/update/:societyId").put(isAuthenticated, updateSociety);

export default router;
