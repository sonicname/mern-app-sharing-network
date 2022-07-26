import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { BadRequest, UnauthenticatedError } from "@errors/errors";
import DiscordWebhook from "@helpers/DiscordWebhook";

import Post from "@models/Post.model";
import Storage from "@models/Storage.model";

import {
  IQueryObject,
  IRequestCreatePost,
  IRequestDeletePost,
  IRequestGetPosts,
  IRequestLikePost,
  IRequestGetPostByID,
  IRequestPostImg,
  IRequestGetPostsByUserID,
} from "@interfaces/post.interface";

const getPosts = async (req: Request, res: Response) => {
  const { page, limit, search } = req.body as IRequestGetPosts;

  const queryObject: IQueryObject = {};

  if (search) {
    queryObject.title = {
      $regex: search,
      $options: "i",
    };
  }

  const countPosts = await Post.countDocuments(queryObject);
  const LIMIT = Number(limit) || 10;
  const totalPages = Math.ceil(countPosts / LIMIT);
  const SKIP = !Number(page) || Number(page) <= 1 ? 0 : LIMIT * Number(page);

  let posts = await Post.find(queryObject)
    .select("-description -__v -updatedAt -post")
    .populate({
      path: "storages",
      select: "thumbnail -_id",
    })
    .populate({
      path: "uploadBy",
      select: "username",
    })
    .skip(SKIP)
    .limit(LIMIT);

  return res.status(StatusCodes.OK).json({
    totalPages,
    page,
    posts,
  });
};

const getPostById = async (req: Request, res: Response) => {
  const { postID } = req.params as unknown as IRequestGetPostByID;
  if (!postID) throw new BadRequest("Please provide postID!");

  const post = await Post.findOne({ _id: postID })
    .populate({
      path: "storages",
      select: "attachment -_id",
    })
    .populate({
      path: "uploadBy",
      select: "username",
    })
    .populate({
      path: "postLikes",
      select: "username",
    });

  if (!post) throw new BadRequest(`Post doesn't exists!`);

  return res.status(StatusCodes.OK).json(post);
};

const getPostsByUserID = async (req: Request, res: Response) => {
  const { userID } = req.params as unknown as IRequestGetPostsByUserID;
  const { page, limit } = req.body as IRequestGetPosts;
  if (!userID) throw new BadRequest("Please provide userID!");

  const LIMIT = Number(limit) || 10;
  const SKIP = !Number(page) || Number(page) <= 1 ? 0 : LIMIT * Number(page);
  const countPosts = await Post.countDocuments({
    uploadBy: userID,
  });
  const totalPages = Math.ceil(countPosts / LIMIT);

  const posts = await Post.find({ uploadBy: userID })
    .populate({
      path: "storages",
      select: "thumbnail",
    })
    .skip(SKIP)
    .limit(LIMIT);

  return res.status(StatusCodes.OK).json({
    page: page ? page : 1,
    totalPages,
    posts,
  });
};

const createPost = async (req: Request, res: Response) => {
  if (!req.files) throw new BadRequest("File upload is not provided!");
  const { title, description } = req.body as IRequestCreatePost;
  const { attachment } = req.files as unknown as IRequestPostImg;

  if (!title || !description || !attachment)
    throw new BadRequest("Please provide all field!");

  const storageID = await DiscordWebhook.uploadFile(
    attachment,
    req.user?.userID as string
  );

  const post = await Post.create({
    title,
    description,
    storages: storageID,
    uploadBy: req.user?.userID as string,
  });

  return res.status(StatusCodes.OK).json({
    message: "Create post success",
    post,
  });
};

const deletePost = async (req: Request, res: Response) => {
  const { postID } = req.body as IRequestDeletePost;
  if (!postID) throw new BadRequest("Please provide postID to delete post!");

  const post = await Post.findOne({ _id: postID }).populate("storages");

  if (!post) throw new BadRequest("Post doesn't exists!");
  if (post.uploadBy.toString() !== req.user?.userID)
    throw new UnauthenticatedError("Invalid credentials");

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

const likePost = async (req: Request, res: Response) => {
  const { postID } = req.body as IRequestLikePost;
  if (!postID) throw new BadRequest("Please provide postID!");

  await Post.updateOne(
    { _id: postID },
    {
      $addToSet: {
        postLikes: req.user?.userID,
      },
    }
  );
  return res.status(StatusCodes.OK).json({
    message: "Ok",
  });
};

const dislikePost = async (req: Request, res: Response) => {
  const { postID } = req.body as IRequestLikePost;
  if (!postID) throw new BadRequest("Please provide postID!");

  await Post.updateOne(
    { _id: postID },
    {
      $pullAll: {
        postLikes: [req.user?.userID],
      },
    }
  );

  return res.status(StatusCodes.OK).json({
    message: "Ok",
  });
};

export {
  createPost,
  deletePost,
  getPosts,
  getPostById,
  likePost,
  dislikePost,
  getPostsByUserID,
};
