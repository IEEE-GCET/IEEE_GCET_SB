import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js";
import {userRoutes,societyRoutes, eventRoutes} from "./routes/index.js";
dotenv.config();
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
console.log()

app.use(cors(corsOptions));
// console.log(process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY);

const PORT = process.env.PORT;

// API Calls

app.use("/api/ieeegcetsb/user", userRoutes);
app.use("/api/ieeegcetsb/society", societyRoutes);
app.use("/api/ieeegcetsb/event", eventRoutes);

app.get("/", (req, res) => {
  res.send("Home page");
});


app.listen(PORT, () => {
    connectDB();
  console.log(`Server is running on port ${PORT}`);
});




// const input = `IEEE GCET Student Branch (SB) is a vibrant and dynamic chapter at Geethanjali College of Technology and Engineering (GCET), dedicated to fostering innovation, collaboration, and technical excellence among students. As part of the global IEEE network, the student branch empowers young engineers and technologists to explore emerging technologies, develop leadership skills, and engage with a diverse community of like-minded individuals.

// At IEEE GCET SB, we organize a variety of events, including technical workshops, hackathons, webinars, guest lectures by industry experts, coding competitions, and career guidance sessions. Our mission is to provide a platform for students to enhance their knowledge, contribute to cutting-edge projects, and bridge the gap between academia and industry.

// With a focus on professional growth and community impact, IEEE GCET SB serves as a hub for aspiring innovators to explore opportunities, build networks, and create meaningful change in the fields of engineering, technology, and beyond.

// Join us in shaping the future of technology—together, we innovate, inspire, and lead!`;

// // Split by newlines and add a delimiter
// const delimiter = "<<PARA>>";
// const descriptionWithDelimiter = input.split("\n\n").join(delimiter);

// // Output the modified text
// console.log(descriptionWithDelimiter);

// // without delimeter
// const descriptionWithoutDelimiter = input.split("<<PARA>>").join("/n");
// console.log(descriptionWithoutDelimiter);