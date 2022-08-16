import { ITag } from "./tags";
import { ImageListType } from "react-images-uploading";

export interface IPost {
  title: string;
  description: string;
  tags: ITag[];
  thumbnail: ImageListType;
  attachments: ImageListType;
}

export interface IPendingPost {
  _id: string;
  title: string;
  storages: {
    thumbnail: {
      url: string;
      proxy_url: string;
    };
  };
  uploadBy: {
    _id: string;
    username: string;
  };
  postStatus: string;
  createdAt: Date;
}

export interface UploadPageStates {
  tags: ITag[];
  filterTags: ITag[];
  selectTags: ITag[];
  show: boolean;
  thumbnail: File[];
  images: File[];
}

export interface IRequestGetTags {
  message: string;
  tags: ITag[];
}

export interface IRequestGetPosts {
  page: number;
  countPosts: number;
  totalPages: number;
  posts: IPendingPost[];
}
