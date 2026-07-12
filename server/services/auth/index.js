import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
dotenv.config();

const app = express();

const port = process.env.PORT;

app.get("/", (req, res) => {
  return res.json({ message: "hellow form auth service" });
});

connectDb();

app.listen(port, () => {
  console.log(`authh service is running on port ${port}`);
});
