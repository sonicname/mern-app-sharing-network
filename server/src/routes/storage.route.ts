import { Router } from "express";
const storageRoute = Router();

import { auth } from "@middlewares/auth";
import { uploadFile } from "@controller/index";

storageRoute.post("/upload", auth, uploadFile);

export default storageRoute;
