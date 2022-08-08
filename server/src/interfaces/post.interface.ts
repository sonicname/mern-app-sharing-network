import { Document, PopulatedDoc } from "mongoose";
import { IStorage } from "@interfaces/storage.interface";
import { ITag } from "@interfaces/tags.interface";
import { IUser } from "@interfaces/auth.interface";

export interface IPost {
  title: string;
  description: string;
  storages: PopulatedDoc<IStorage & Document>;
  tags: PopulatedDoc<ITag> & Document;
  uploadBy: PopulatedDoc<IUser & Document>;
  postLikes: PopulatedDoc<IUser & Document>[];
  postStatus: string;
}

interface IFile {
  name: string;
  data: Buffer;
  size: number;
}

export interface IRequestPostImg {
  attachments: IFile[];
  thumbnail: IFile;
}

export interface IRequestCreatePost {
  title: string;
  description: string;
  tags: string[];
}

export interface IRequestDeletePost {
  postID: string;
}
