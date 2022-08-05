import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

declare module "jsonwebtoken" {
  export interface CustomJWTPayload extends JwtPayload {
    userID: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        userID: string;
      };
    }
  }
}

export interface IRequest {
  email: string;
  password: string;
}

export interface IExtentRequestBody extends IRequest {
  username: string;
}

export interface IError {
  statusCode: number;
  message: string;
}

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

export interface IQueryPage {
  page: string;
}
