import mongoose, { Schema } from "mongoose";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  name: {
    type: String,
    require: [true, "user name is required"],
    minLength: [5, "Name must be at least 5 char"],
    maxLength: [50, "Name must be less than 50 char"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "user email is required"],
    unique: [true, "already registered"],
    lowercase: true,
  },
  password: {
    type: String,
    select: false,
  },
  forgotPasswordToken: {
    type: String,
  },
  forgotPasswordExpiryDate: {
    type: Date,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

userSchema.methods = {
  jwtToken() {
    return JWT.sign({ id: this._id, email: this.email }, process.env.SECRET, {
      expiresIn: "24h",
    });
  },
};

const userModel = mongoose.model("user", userSchema);

export default userModel;
