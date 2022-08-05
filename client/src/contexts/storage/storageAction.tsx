export enum Action {
  UPLOAD_BEGIN = "UPLOAD_BEGIN",
  UPLOAD_SUCCESS = "UPLOAD_SUCCESS",
  UPLOAD_ERROR = "UPLOAD_ERROR",
}

export interface IStorageAction {
  type: Action;
  payload?: any;
}
