import express from "express";
import signup from "../controller/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);

export default authRouter;
