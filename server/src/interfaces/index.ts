import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import { StatusCodes } from "http-status-codes";

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

export interface IError {
  message: string;
  statusCode: StatusCodes;
}

export interface IAuthRequest {
  email: string;
  password: string;
}

export interface IExtentRequestBody extends IAuthRequest {
  username: string;
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

export interface ITagRequest {
  name: string;
}

export interface ITagUpdateRequest extends ITagRequest {
  newName: string;
}
