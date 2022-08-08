import { Router } from "express";
const authRoute = Router();

import { authMiddleware } from "@middlewares/auth.middleware";
import {
  loginUser,
  updateUser,
  registerUser,
} from "@controller/auth.controller";

authRoute.post("/login", loginUser);
authRoute.post("/register", registerUser);
authRoute.patch("/update", authMiddleware, updateUser);

export default authRoute;
