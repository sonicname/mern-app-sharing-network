import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export default function generateJwt(userId: Types.ObjectId): string {
  return jwt.sign({ userID: userId }, process.env["JWT_SECRET"] as string, {
    expiresIn: process.env["JWT_LIFETIME"],
  });
}
