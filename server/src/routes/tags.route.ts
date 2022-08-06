import { Router } from "express";
const tagsRoute = Router();

import { getAllTags, createNewTags, updateTag } from "@controller/index";
import { auth } from "@middlewares/auth";

tagsRoute.get("/", getAllTags);
tagsRoute.post("/create", auth, createNewTags);
tagsRoute.patch("/update", auth, updateTag);

export default tagsRoute;
