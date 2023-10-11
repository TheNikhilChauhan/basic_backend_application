import express from "express";
import {
  signup,
  signin,
  getUser,
  logout,
  forgotPassword,
  resetPassword,
} from "../controller/authController.js";
import jwtAuth from "../middleware/jwtAuth.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/forgotpassword", forgotPassword);
authRouter.post("/resetpassword/:token", resetPassword);
authRouter.get("/getUser", jwtAuth, getUser);
authRouter.get("/logout", jwtAuth, logout);

export default authRouter;
