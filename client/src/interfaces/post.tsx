import { ITag } from "./tags";
import { ImageListType } from "react-images-uploading";

export interface IPost {
  title: string;
  description: string;
  tags: ITag[];
  thumbnail: ImageListType;
  attachments: ImageListType;
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
