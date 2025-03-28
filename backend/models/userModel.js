import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "advisor", "chair"],
      default: "chair",
      required: true,
    },
    academics: {
      year: {
        type: String,
        enum: ["1", "2", "3", "4"],
      },
      dept: {
        type: String,
        enum: ["CSE", "IT", "ECE", "EEE", "MECH", "CIVIL"],
        default: "CSE",
        required: true,
      },
      position: {
        type: String,
        default: "Student",
        required: true,
      },
      experience: {
        type: Number,
        default: 0,
      },
    },
    description: {
      type: String,
      default: "No description available",
      required: true,
    },
    societies_registered: [
      {
        type: Schema.Types.ObjectId,
        default: [""],
        ref: "Society",
        required: true,
      },
    ],
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    society_members: {
      type: [String],
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
