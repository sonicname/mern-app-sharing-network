import { ImageListType } from "react-images-uploading";

export interface IPost {
  title: string;
  description: string;
  attachment: ImageListType;
}

export interface UploadPageStates {
  show: boolean;
  images: File[];
}
