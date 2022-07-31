import { Router } from "express";
import { auth } from "@middlewares/auth";
import { upload } from "@controller/index";
const storageRoute = Router();

storageRoute.post("/upload", auth, upload);

export default storageRoute;
