import { Router } from "express";
const tagsRoute = Router();

import {
  getAllTags,
  createNewTags,
  updateTag,
  deleteTag,
} from "@controller/tags.controller";
import { authMiddleware } from "@middlewares/auth.middleware";

tagsRoute.get("/", getAllTags);
tagsRoute.post("/create", authMiddleware, createNewTags);
tagsRoute.patch("/update", authMiddleware, updateTag);
tagsRoute.delete("/delete", authMiddleware, deleteTag);

export default tagsRoute;
