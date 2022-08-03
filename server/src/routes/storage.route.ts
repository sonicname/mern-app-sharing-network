import { Router } from "express";
const storageRoute = Router();

import { auth } from "@middlewares/auth";
import { uploadFile, deleteFile, getFiles } from "@controller/index";

storageRoute.get("/", getFiles);
storageRoute.post("/upload", auth, uploadFile);
storageRoute.delete("/delete", auth, deleteFile);

export default storageRoute;
