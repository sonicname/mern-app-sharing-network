import { Document, PopulatedDoc } from "mongoose";
import { IFile, IStorage } from "@interfaces/storage.interface";
import { ITag } from "@interfaces/tags.interface";
import { IUser } from "@interfaces/auth.interface";

interface ITitle {
  title: string;
}

interface IDescription {
  description: string;
}

interface IPostID {
  postID: string;
}

export interface IPost extends ITitle, IDescription {
  storages: PopulatedDoc<IStorage & Document>;
  tags: PopulatedDoc<ITag & Document>;
  uploadBy: PopulatedDoc<IUser & Document>;
  postLikes: PopulatedDoc<IUser & Document>[];
  postStatus: string;
}

export interface IRequestPostImg {
  attachments: IFile[];
  thumbnail: IFile;
}

export interface IRequestCreatePost extends ITitle, IDescription {
  tags: string[];
}

export interface IRequestDeletePost extends IPostID {}

export interface IRequestGetPosts {
  page?: string;
  limit?: string;
  search?: string;
  sort?: string;
}

export interface IQueryObject {
  title?: {
    $regex: string;
    $options: string;
  };
}

export interface IRequestLikePost extends IPostID {}

export interface IRequestGetPostByID extends IPostID {}

export interface IRequestGetPostsByTag {
  tagID: string;
}

export interface IRequestGetPostsByUserID {
  userID: string;
}
