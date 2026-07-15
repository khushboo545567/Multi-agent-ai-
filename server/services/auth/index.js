import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRouter from "./route/auth.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.json({ message: "hello from auth service" });
});
// app.use((req, res, next) => {
//   console.log(req.body);
//   next();
// });
app.use("/api/v1/user", authRouter);

connectDb();

app.listen(port, () => {
  console.log(`Auth service is running on port ${port}`);
});
