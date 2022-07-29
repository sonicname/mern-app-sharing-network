import { Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
    minLength: 3,
    maxLength: 30,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: 8,
    select: false,
  },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userID: this._id }, process.env["JWT_SECRET"] as string, {
    expiresIn: process.env["JWT_LIFETIME"] as string,
  });
};

// @ts-ignore
export default model("Users", UserSchema);
