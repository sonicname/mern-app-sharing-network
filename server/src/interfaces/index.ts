import { IExtentAuthRequest, IAuthRequest } from "./auth";
import { IError } from "./error";
import {
  IRequestFiles,
  IFile,
  IRequestDeleteMessage,
  IAttachment,
  IPostAttachment,
} from "./storage";
import { ITagRequest, ITagUpdateRequest } from "./tags";

interface IQueryPage {
  page: string;
}

export {
  IExtentAuthRequest,
  IAuthRequest,
  IError,
  IRequestFiles,
  IFile,
  IRequestDeleteMessage,
  IAttachment,
  IPostAttachment,
  ITagUpdateRequest,
  ITagRequest,
  IQueryPage,
};
