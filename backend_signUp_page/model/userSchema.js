import mongoose, { Schema } from "mongoose";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

// bcrypt: hash password before saving to the database
userSchema.pre("save", async function (next) {
  //if password is not modified then do not hash it
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

//jwt token
userSchema.methods = {
  jwtToken() {
    return JWT.sign({ id: this._id, email: this.email }, process.env.SECRET, {
      expiresIn: "24h",
    });
  },

  // method for generating and return forgotpassword token
  getForgotPasswordToken() {
    const forgotToken = crypto.randomBytes(20).toString("hex");

    // save to db step 1
    this.forgotPasswordToken = crypto
      .createHash("sha256")
      .update(forgotToken)
      .digest("hex");

    //forgot password expiry date
    this.forgotPasswordExpiryDate = Date.now() + 20 * 60 * 1000;

    // step 2- return values to user
    return forgotToken;
  },
};

const userModel = mongoose.model("user", userSchema);

export default userModel;
