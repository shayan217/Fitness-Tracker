import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/User.js";

// Load environment variables from config.env file
dotenv.config({ path: './config.env' });

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true })); // for form data

app.use("/api/user/", UserRoutes);

// Error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello developers from GFG",
  });
});

// MongoDB connection function
const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
      console.error("Failed to connect with MongoDB");
      console.error(err);
    });
};
// const connectDB = () => {
//   mongoose.set("strictQuery", true); // Optional, for mongoose strict query mode
//   mongoose
//     .connect(process.env.MONGODB_URL) // No need for additional options
//     .then(() => console.log("Connected to MongoDB"))
//     .catch((err) => {
//       console.error("Failed to connect with MongoDB");
//       console.error(err);
//     });
// };



// Start server and connect to DB
const startServer = async () => {
  try {
    connectDB();
    app.listen(8080, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
