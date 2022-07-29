import express from "express";
import {
  loginUser,
  registerUser,
  updateUser,
} from "@controller/auth.controller";
import { auth } from "@middlewares/auth";
const authRoute = express.Router();

authRoute.post("/login", loginUser);
authRoute.post("/register", registerUser);
authRoute.patch("/update", auth, updateUser);

export default authRoute;
