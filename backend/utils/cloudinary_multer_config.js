// cloudinary_multer_config.js
import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv';
dotenv.config();
import { CloudinaryStorage } from "multer-storage-cloudinary";
// console.log(process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,       
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "IeeeGcetSb",
    allowedFormats: ["jpeg", "png", "jpg", "webp"],
  }
});

export default { cloudinary, storage };
