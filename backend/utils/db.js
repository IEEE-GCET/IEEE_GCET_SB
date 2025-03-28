import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
    });
    console.log(`MongoDB Connected succesfully to ${conn.connection.host}`);
    // console.log(process.env.MONGO_URI)
    // console.log(process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY);
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

export default connectDB;