import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { Society } from "../models/societyModel.js";

export const societyRegistration = async (req, res) => {
  try {
    const { name, description, advisor, chair, members } = req.body;
    console.log(req.body);
    if (!name || !description || !advisor || !chair || !members) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingSociety = await Society.findOne({ name });
    if (existingSociety) {
      return res.status(400).json({ message: "Society already exists" });
    }
    let society = await Society.create({
      name,
      description,
      advisor,
      chair,
      members,
      creator: req.id,
    });
    res.status(201).json({
      message: "Society registered successfully",
      society,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSociety = async (req, res) => {
  try {
    const { societyId } = req.params;
    const society = await Society.findById(societyId)
      .populate("advisor")
      .populate("chair");
    if (!society) {
      return res
        .status(404)
        .json({ message: "Society not found", success: false });
    }
    return res.status(200).json({
      message: "Society found successfully",
      society,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllSocieties = async (req, res) => {
  try {
    const societies = await Society.find()
      .sort({ createdAt: -1 })
      .populate("advisor")
      .populate("chair");
    res.status(200).json({
      message: "Societies found successfully",
      societies,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateSociety = async (req, res) => {
  try {
    if (!Object.keys(req.body).length)
      return res.status(400).json({
        message: "Please change something to update",
        success: false,
      });
    const { name, description, advisor, chair, members } = req.body;
    const file = req.file;
    const societyId = req.params.societyId;
    //Cloudinary file manipulation
    let society = await Society.findById(societyId)
      .populate("advisor")
      .populate("chair")
      .populate("events");
    if (!society) {
      return res.status(400).json({
        message: "Society not found",
        success: false,
      });
    }

    //Society Updation
    if (name) society.name = name;
    if (description) society.description = description;
    if (advisor) society.advisor = advisor;
    if (chair) society.chair = chair;
    if (members) society.members = members;
    //resume will be mention later
    await society.save();
    society = {
      _id: society._id,
      name: society.name,
      description: society.description,
      advisor: society.advisor,
      chair: society.chair,
      members: society.members,
      creator: society.creator,
    };
    return res.status(200).json({
      society,
      message: "Society information updated successfully",
      success: true,
    });
  } catch (error) {}
};
