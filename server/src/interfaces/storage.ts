import { Types } from "mongoose";

export interface IFile {
  name: string;
  data: Buffer;
  size: number;
}

export interface IRequestFiles {
  attachments: IFile[] | IFile;
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

export interface IRequestDeleteMessage {
  fileID: Types.ObjectId;
}
