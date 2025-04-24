import { Todo } from "../models/Todo.js";
import { User } from "../models/User.js";
import express from "express";

export const todoRouter = express.Router();

// Get all todos for a user
todoRouter.get("/getAllTodos", async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: "Name parameter is required" });
    }

    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const todos = await Todo.find({ user: user._id });
    return res.status(200).json({
      success: true,
      message: "All todos retrieved successfully",
      data: todos,
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return res.status(500).json({ 
      success: false,
      error: "Internal server error" 
    });
  }
});

// Get single todo
todoRouter.get("/getTodo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.query;

    if (!name || !id) {
      return res.status(400).json({ 
        success: false,
        error: "Both ID and name are required" 
      });
    }

    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: "User not found" 
      });
    }

    const todo = await Todo.findOne({ _id: id, user: user._id });
    if (!todo) {
      return res.status(404).json({ 
        success: false,
        error: "Todo not found or doesn't belong to this user" 
      });
    }

    return res.status(200).json({
      success: true,
      message: "Todo retrieved successfully",
      data: todo,
    });
  } catch (error) {
    console.error("Error fetching todo:", error);
    return res.status(500).json({ 
      success: false,
      error: "Internal server error" 
    });
  }
});

// Create a todo
todoRouter.post("/createTodo", async (req, res) => {
  try {
    const { name, task, isCompleted = false } = req.body;

    if (!name || !task) {
      return res.status(400).json({ 
        success: false,
        error: "Name and task are required" 
      });
    }

    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: "User not found" 
      });
    }

    const newTodo = await Todo.create({
      task,
      isCompleted,
      user: user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: newTodo,
    });
  } catch (error) {
    console.error("Error creating todo:", error);
    return res.status(500).json({ 
      success: false,
      error: "Internal server error" 
    });
  }
});

// Update a todo
todoRouter.put("/updateTodo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, task, isCompleted } = req.body;

    if (!name || !id) {
      return res.status(400).json({ 
        success: false,
        error: "Both ID and name are required" 
      });
    }

    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: "User not found" 
      });
    }

    const todo = await Todo.findOneAndUpdate(
      { _id: id, user: user._id },
      { task, isCompleted },
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({ 
        success: false,
        error: "Todo not found or doesn't belong to this user" 
      });
    }

    return res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: todo,
    });
  } catch (error) {
    console.error("Error updating todo:", error);
    return res.status(500).json({ 
      success: false,
      error: "Internal server error" 
    });
  }
});

// Delete a todo
todoRouter.delete("/deleteTodo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || !id) {
      return res.status(400).json({ 
        success: false,
        error: "Both ID and name are required" 
      });
    }

    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: "User not found" 
      });
    }

    const todo = await Todo.findOneAndDelete({ _id: id, user: user._id });
    if (!todo) {
      return res.status(404).json({ 
        success: false,
        error: "Todo not found or doesn't belong to this user" 
      });
    }

    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      deletedId: id,
    });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return res.status(500).json({ 
      success: false,
      error: "Internal server error" 
    });
  }
});