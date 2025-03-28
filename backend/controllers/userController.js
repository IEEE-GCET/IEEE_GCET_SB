import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/userModel.js";

// -----------------------------
// User Registration Controller
// -----------------------------
export const userRegistration = async (req, res) => {
  try {
    const {
      fullname,
      email,
      password,
      role,
      academics,
      description,
      societies_registered,
      society_members,
    } = req.body;
    console.log(req.body);
    if (
      !fullname ||
      !email ||
      !password ||
      !role ||
      !academics ||
      !description ||
      !societies_registered ||
      !society_members
    )
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });

    let user = await User.findOne({ email });
    if (user) {
      console.log("User already exists");
      return res.status(400).json({
        message: "User with current email already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 15);
    await User.create({
      fullname,
      email,
      password: hashedPassword,
      role,
      academics,
      description,
      societies_registered,
      society_members,
    });
    user = await User.findOne({ email });
    return res.status(201).json({
      message: "Account registered successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// -----------------------------
// User Login Controller
// -----------------------------
export const userLogin = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Please fill all the credentials",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role",
        success: false,
      });
    }
    const tokenData = { userId: user._id };
    // Optionally repopulate user with societies_registered if needed
    user = await User.findById(tokenData.userId).populate("societies_registered");

    // Sign a short-lived access token (e.g., 15 minutes)
    const accessToken = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "15m",
    });
    // Sign a longer-lived refresh token (e.g., 7 days)
    // const refreshToken = jwt.sign(tokenData, process.env.REFRESH_TOKEN_SECRET, {
    //   expiresIn: "7d",
    // });

    return res
      .status(201)
      .cookie("token", accessToken, {
        maxAge: 15 * 60 * 1000, // 15 minutes
        httpOnly: true,
        sameSite: "strict",
        // secure: process.env.NODE_ENV === "production",
      })
      // .cookie("refreshToken", refreshToken, {
      //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      //   httpOnly: true,
      //   sameSite: "strict",
      //   // secure: process.env.NODE_ENV === "production",
      // })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// -----------------------------
// User Logout Controller
// -----------------------------
export const userLogout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .cookie("refreshToken", "", { maxAge: 0 })
      .json({
        message: "Logged out successfully",
        success: true,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong, please try again later",
      success: false,
    });
  }
};

// -----------------------------
// Session Status Endpoint
// -----------------------------
export const sessionStatus = (req, res) => {
  try {
    const token = req.cookies.token;
    console.log("Token:", token);
    if (!token) {
      return res.json({
        message: "Session expired",
        success: false,
      });
    }
    // Synchronously verify the token. If it fails, jwt.verify will throw an error.
    jwt.verify(token, process.env.SECRET_KEY);
    return res.status(200).json({
      message: "Session active",
      success: true,
    });
  } catch (error) {
    console.error("Session status error:", error);
    return res.json({
      message: "Session expired",
      success: false,
    });
  }
};
// -----------------------------
// Refresh Token Endpoint
// -----------------------------
export const refreshToken = async (req, res) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;
    if (!refreshTokenCookie) {
      return res.status(401).json({
        message: "No refresh token",
        success: false,
      });
    }
    jwt.verify(refreshTokenCookie, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: "Invalid refresh token",
          success: false,
        });
      }
      const tokenData = { userId: decoded.userId };
      const newAccessToken = jwt.sign(tokenData, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
      res.cookie("token", newAccessToken, {
        maxAge: 1000 * 60 * 60 * 24 , // 1 day
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });
      return res.status(200).json({
        message: "Access token refreshed",
        success: true,
      });
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// -----------------------------
// Fetch Single User
// -----------------------------
export const fetchUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId)
      .populate("societies_registered")
      .populate("events");
    return res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong, please try again later",
      success: false,
    });
  }
};

// -----------------------------
// Fetch All Users
// -----------------------------
export const fetchAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate("societies_registered")
      .populate("events");
    if (!users) {
      return res.status(404).json({
        message: "Users not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Users fetched successfully",
      users,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong, please try again later",
      success: false,
    });
  }
};

// -----------------------------
// Update User Controller
// -----------------------------
export const updateUser = async (req, res) => {
  try {
    if (!Object.keys(req.body).length)
      return res.status(400).json({
        message: "Please change something to update",
        success: false,
      });
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
    const {
      fullname,
      email,
      role,
      academics,
      description,
      societies_registered,
      society_members,
    } = req.body;
    if (!user)
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (role) user.role = role;
    if (academics) user.academics = academics;
    if (description) user.description = description;
    if (societies_registered) user.societies_registered = societies_registered;
    if (society_members) user.society_members = society_members;
    await user.save();
    return res.status(200).json({
      message: "User updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong, please try again later",
      success: false,
    });
  }
};
