import express from "express";
import { authRouter } from "./router/auth.js";
import dotenv from "dotenv";
import { connectDB } from "./connect.js";
import { todoRouter } from "./router/todo.js";
dotenv.config();

export const app = express();
connectDB();

app.use(express.json());
app.use("/api", authRouter);
app.use("/api", todoRouter);

app.listen(8080, () => {
  console.log("server stated");
});
