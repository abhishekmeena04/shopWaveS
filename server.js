import express from "express";
import colors from "colors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
// mongo db connection
connectDB();

const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

// importing routes
import userRotes from "./routes/userRoutes.js";

// http://locqalhost:8080/
// http://locqalhost:8080/api/v1/users
app.use("/api/v1/users", userRotes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is listening at port ${PORT}`.bgRed);
});
