import { Router } from "express";
const postRoute = Router();

import { authMiddleware } from "@middlewares/auth.middleware";
import { createPost, deletePost } from "@controller/post.controller";

postRoute.post("/create", authMiddleware, createPost);
postRoute.delete("/delete", authMiddleware, deletePost);

export default postRoute;
