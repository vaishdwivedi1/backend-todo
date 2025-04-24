import mongoose, { Schema } from "mongoose";

// Define the schema
const todoSchema = new Schema({
  task: {
    type: String,
    required: true, // corrected from 'require' to 'required'
  },
  completed: {
    type: Boolean,
    default: false, // corrected spelling from 'competed' to 'completed'
  },
  createdAt: {
    type: Date,
    default: Date.now, // use the function reference, not the result of calling it
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // corrected usage for referencing another schema
  },
});

// Export the model
export const Todo = mongoose.model("Todo", todoSchema); // corrected 'Model' to 'model'
