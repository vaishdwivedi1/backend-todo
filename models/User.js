import mongoose, { Schema } from "mongoose";

// Define the user schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
});

// Create and export the User model
export const User = mongoose.model("User", userSchema);
