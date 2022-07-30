import { Router } from "express";
const authRoute = Router();

import { loginUser, registerUser, updateUser } from "@controller/index";
import { auth } from "@middlewares/auth";

authRoute.post("/login", loginUser);
authRoute.post("/register", registerUser);
authRoute.patch("/update", auth, updateUser);

export default authRoute;
