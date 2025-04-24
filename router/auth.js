import { Router } from "express";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";

export const authRouter = Router();

// Login route
authRouter.post("/login", async (req, res) => {
  console.log(req, req.body);

  const { name, password } = req.body;

  try {
    if (!name || !password) {
      return res.status(400).json("name and password are required");
    }

    const user = await User.findOne({ name });

    if (!user) {
      return res.status(404).json("User does not exist");
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return res.status(401).json("Invalid password");
    }

    res.status(200).json("Logged in successfully");
  } catch (error) {
    res.status(500).json("Something went wrong");
  }
});

// Register route
authRouter.post("/register", async (req, res) => {
  console.log(req, req.body);
  const { name, password } = req.body;

  try {
    if (!name || !password) {
      return res.status(400).json("name and password are required");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({ name, password: hashPassword });
    console.log(hashPassword);
    res.status(201).json("Registered successfully");
  } catch (error) {
    res.status(500).json("Something went wrong");
  }
});

export default authRouter;
