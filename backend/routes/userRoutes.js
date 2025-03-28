import express from "express";
import {
  fetchUser,
  userLogin,
  userLogout,
  userRegistration,
  fetchAllUsers,
  updateUser,
  sessionStatus,
  refreshToken,
} from "../controllers/userController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(userRegistration);
router.route("/login").post(userLogin);
router.route("/logout").get(isAuthenticated, userLogout);
router.route("/all").get(isAuthenticated, fetchAllUsers);
router.route("/update/:userId").put(isAuthenticated, updateUser);
router.route("/session-status").get(sessionStatus);
router.route("/refresh-token").post(refreshToken);
router.route("/:userId").get(isAuthenticated, fetchUser);

export default router;
