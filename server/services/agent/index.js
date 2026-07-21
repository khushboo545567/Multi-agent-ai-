import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import agentRouter from "./routes/agent.route.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.json({ message: "hello from agent service" });
});

app.use("/api/v1/agent", agentRouter);

connectDb();

app.listen(port, () => {
  console.log(`agent service is running on port ${port}`);
});
