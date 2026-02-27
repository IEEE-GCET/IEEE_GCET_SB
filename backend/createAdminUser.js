import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "./models/userModel.js";

dotenv.config();

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // Check if user already exists
    const existingUser = await User.findOne({ email: "ieeesb@gcet.edu.in" });
    
    if (existingUser) {
      console.log("User already exists!");
      console.log("Email:", existingUser.email);
      console.log("Role:", existingUser.role);
      process.exit(0);
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash("Gcet@ieee2023", 15);
    
    const adminUser = await User.create({
      fullname: "IEEE GCET SB Admin",
      email: "ieeesb@gcet.edu.in",
      password: hashedPassword,
      role: "admin",
      academics: {
        dept: "CSE",
        position: "Administrator",
        experience: 5,
      },
      description: "IEEE GCET Student Branch Administrator",
    });

    console.log("✅ Admin user created successfully!");
    console.log("Email:", adminUser.email);
    console.log("Password: Gcet@ieee2023");
    console.log("Role:", adminUser.role);
    console.log("\nYou can now login with these credentials!");
    
    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

createAdminUser();
