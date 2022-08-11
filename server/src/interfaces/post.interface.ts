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

export interface IRequestDeletePost {
  postID: string;
}
