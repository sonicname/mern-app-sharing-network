import { Document, PopulatedDoc } from "mongoose";
import { IUser } from "@interfaces/auth.interface";

export interface IFile {
  name: string;
  data: Buffer;
  size: number;
}

export interface IAttachmentURL {
  url: string;
  proxy_url: string;
}

export interface IAttachment extends IAttachmentURL {
  id: string;
  filename: string;
  size: number;
  width: number;
  height: number;
  content_type: string;
}

export interface IStorage {
  messageID: string;
  thumbnail: IAttachmentURL;
  attachments: IAttachmentURL[];
  uploadBy: PopulatedDoc<IUser & Document>;
}
