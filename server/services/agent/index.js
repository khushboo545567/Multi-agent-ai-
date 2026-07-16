import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.json({ message: "hello from agent service" });
});

connectDb();

app.listen(port, () => {
  console.log(`agent service is running on port ${port}`);
});
