import { ITag } from "./tags";

export interface IAuthInfoBase {
  email: string;
  password: string;
}

export interface IExtentAuthInfo extends IAuthInfoBase {
  username: string;
}

export interface IUserToken {
  email: string;
  username: string;
  token: string;
}

export interface IPost {
  title: string;
  description: string;
  tags: ITag[];
  attachments: File[];
  thumbnail: File[];
}
