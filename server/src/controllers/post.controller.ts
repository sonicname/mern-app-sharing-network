import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { BadRequest, UnauthenticatedError } from "@errors/errors";
import DiscordWebhook from "@helpers/DiscordWebhook";
import Post from "@models/Post.model";
import Storage from "@models/Storage.model";

import {
  IRequestCreatePost,
  IRequestDeletePost,
  IRequestPostImg,
} from "@interfaces/post.interface";

export const createPost = async (req: Request, res: Response) => {
  if (!req.files) throw new BadRequest("File upload is not provided!");
  const { tags, title, description } = req.body as IRequestCreatePost;
  const { attachments, thumbnail } = req.files as unknown as IRequestPostImg;

  if (!tags || !title || !description || !attachments || !thumbnail)
    throw new BadRequest("Please provide all field!");

  const fileID = await DiscordWebhook.uploadFile(
    attachments,
    thumbnail,
    req.user?.userID as string
  );

  const post = await Post.create({
    title,
    description,
    tags,
    storages: fileID,
    uploadBy: req.user?.userID as string,
  });

  return res.status(StatusCodes.OK).json({
    message: "Create post success",
    post,
  });
};

export const deletePost = async (req: Request, res: Response) => {
  const { postID } = req.body as IRequestDeletePost;
  if (!postID) throw new BadRequest("Please provide postID to delete post!");

  const post = await Post.findOne({ _id: postID }).populate("storages");

  if (!post) throw new BadRequest("Post doesn't exists!");
  if (post.uploadBy.toString() !== req.user?.userID)
    throw new UnauthenticatedError("Invalid Credentials");

  const files = await Storage.findOne({ _id: post.storages._id });
  await Promise.all([
    DiscordWebhook.deleteFile(post.storages.messageID),
    files?.delete(),
    post.delete(),
  ]);

  return res.status(StatusCodes.OK).json({
    message: `Deleted post with ID ${postID}`,
  });
};
