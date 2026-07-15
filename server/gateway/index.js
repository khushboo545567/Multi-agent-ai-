import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cors from "cors";
import cookieParser from "cookie-parser";
import verifySession from "./middleware/auth.middleware.js";

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// protected route
app.use(
  "/auth/get-current-user",
  verifySession,
  proxy(process.env.AUTH_SERVICE, {
    proxyReqPathResolver: () => {
      return "/api/v1/user/get-curr-user";
    },
  }),
);
// unprotected route
app.use("/auth", proxy(process.env.AUTH_SERVICE));

app.listen(port, () => {
  console.log(`Gateway started on port ${port}`);
});
