import express from "express";
import authRouter from "./routes/authRoute.js";
import dbConnect from "./config/databaseConfig.js";

const app = express();

dbConnect();

app.use(express.json());

app.use("/api/auth/", authRouter);

app.use("/", (req, res) => {
  res.status(200).json({ data: "JWTauth server" });
});

export default app;
