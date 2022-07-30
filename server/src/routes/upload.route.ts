import { Router } from "express";
import { auth } from "@middlewares/auth";
import { upload } from "@controller/index";
const uploadRoute = Router();

uploadRoute.post("/", auth, upload);

export default uploadRoute;
