import { Schema, model } from "mongoose";
import validator from "validator";
import { genSalt, hash } from "bcryptjs";
import { IUser } from "@interfaces/auth.interface";

const UserSchema = new Schema<IUser>({
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
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    select: false,
  },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});

export default model("users", UserSchema);
