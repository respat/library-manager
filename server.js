import "express-async-errors";
import * as dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import bookRouter from "./routes/bookRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

dotenv.config();
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server working...");
});

app.use("/api/books", bookRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", authenticateUser, userRouter);

app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Server is running on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
