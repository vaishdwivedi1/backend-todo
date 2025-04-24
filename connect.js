import mongoose from "mongoose";

// Connect to MongoDB using the connection string from environment variables
export const connectDB = ()=> mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });
