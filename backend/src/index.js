import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import ErrorMiddleware from "./middlewares/errors.js";
import authRouter from "./routes/auth.js";
import todoRouter from "./routes/todo.js";

import { connectDB } from "./utils/database.js";

const app = express();

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
  app.use(morgan("dev"));
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
      optionsSuccessStatus: 200,
    })
  );
} else if (process.env.NODE_ENV === "production") {
  app.use(
    cors({
      credentials: true,
      origin: process.env.ORIGIN || "http://localhost:3000",
      optionsSuccessStatus: 200,
    })
  );
}

const PORT = process.env.PORT || 3000;

app.use(cookieParser()); // Setting Cookies middleware
app.use(express.static("public"));

app.use(express.json());

process.on("uncaughtException", (err) => {
  console.log(`Error = ${err.message}`);
  console.log("Shutting down server due to uncaughtException Error");
  process.exit(1);
});

app.use("/api/auth", authRouter); // Authentication Router
app.use("/api/todo", todoRouter); // TodoR Router

app.use(ErrorMiddleware);// Error Middleware for error handling

app.get("/", (req, res) => {
  res.send("API IS WORKING ");
});
app.listen(PORT, async () => {
  try {
    await connectDB(
      process.env.URI ||""
    );
    console.log("Database connected!");
    console.log(`Server running at port => ${PORT}`);
  } catch (err) { // If error exit the app
    console.error("---------------------");
    console.error(err);
    console.error("---------------------");

    process.exit();
  }
});
