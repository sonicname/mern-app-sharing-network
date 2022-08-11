import { ITag } from "./tags";

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
