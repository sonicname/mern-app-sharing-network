import { Document, PopulatedDoc } from "mongoose";
import { IUser } from "@interfaces/auth.interface";

export interface IFile {
  name: string;
  data: Buffer;
  size: number;
}

export interface IAttachment {
  id: string;
  filename: string;
  size: number;
  url: string;
  proxy_url: string;
  width: number;
  height: number;
  content_type: string;
}

export interface IPostAttachment {
  data: {
    id: string;
    attachments: IAttachment[];
  };
}

export interface IStorage {
  messageID: string;
  thumbnail: {
    url: string;
    proxy_url: string;
  };
  attachments: { url: string; proxy_url: string }[];
  uploadBy: PopulatedDoc<IUser & Document>;
}
