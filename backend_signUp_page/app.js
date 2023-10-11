import express from "express";
import authRouter from "./routes/authRoute.js";
import dbConnect from "./config/databaseConfig.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dbConnect();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);

app.use("/api/auth", authRouter);

app.use("/", (req, res) => {
  res.status(200).json({ data: "JWTauth server" });
});

export default app;
