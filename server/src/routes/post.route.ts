import { Router } from "express";
const postRoute = Router();

import { authMiddleware } from "@middlewares/auth.middleware";
import {
  createPost,
  deletePost,
  dislikePost,
  getPostById,
  getPosts,
  likePost,
  getPostsByUserID,
} from "@controller/post.controller";

postRoute.get("/", getPosts);
postRoute.get("/user/:userID", getPostsByUserID);
postRoute.get("/:postID", getPostById);
postRoute.post("/create", authMiddleware, createPost);
postRoute.delete("/delete", authMiddleware, deletePost);
postRoute.post("/like", authMiddleware, likePost);
postRoute.post("/dislike", authMiddleware, dislikePost);

export default postRoute;
