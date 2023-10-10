import userModel from "../model/userSchema.js";
import emailValidator from "email-validator";
import bcrypt from "bcrypt";

//sign up
const signup = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  console.log(name, email, password, confirmPassword);

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Every Field is required",
    });
  }

  const validEmail = emailValidator.validate(email);
  if (!validEmail) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email id",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Password and Confirm Password does not match",
    });
  }

  try {
    const userInfo = userModel(req.body);

    const result = await userInfo.save();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Account already exists with provided email id",
      });
    }
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//sign in
const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Every Field is required",
    });
  }

  const user = await userModel
    .findOne({
      email,
    })
    .select("+password");

  if (!user || (await bcrypt.compare(password, user.password))) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  try {
    const token = user.jwtToken();
    user.password = undefined;

    const cookieOption = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    };

    res.cookie("token", token, cookieOption);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
    console.log("errorlast:", error);
  }
};

// get user information
const getUser = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const user = await userModel.findById(userId);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

//logout
const logout = (req, res) => {
  try {
    const cookieOption = {
      expires: new Date(),
      httpOnly: true,
    };
    res.cookie("token", null, cookieOption);
    res.status(200).json({
      success: true,
      message: "Logged out",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export { signup, signin, getUser, logout };
