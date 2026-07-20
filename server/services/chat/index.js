import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import chatRoute from "./route/chat.route.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.json({ message: "hello from chat service" });
});

app.use("/api/v1/chat", chatRoute);

connectDb();

app.listen(port, () => {
  console.log(`chat service is running on port ${port}`);
});
