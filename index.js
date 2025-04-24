import express from "express";
import { authRouter } from "./router/auth.js";
import dotenv from "dotenv";
import { connectDB } from "./connect.js";
import { todoRouter } from "./router/todo.js";
dotenv.config();

export const app = express();
connectDB();

app.use(express.json());
app.use("/", authRouter);
app.use("/", todoRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/about", (req, res) => {
  res.send("About route 🎉 ");
});
app.listen(8080, () => {
  console.log("server stated");
});
