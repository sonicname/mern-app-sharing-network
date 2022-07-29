import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const generateJwt = (userId: Types.ObjectId) => {
  return jwt.sign({ userID: userId }, process.env["JWT_SECRET"] as string, {
    expiresIn: process.env["JWT_LIFETIME"],
  });
};
