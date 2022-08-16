export interface IPostAction {
  type: Action;
  payload?: any;
}

export enum Action {
  GET_IMAGES_IN_DISK = "GET_IMAGES_IN_DISK",
  REMOVE_IMAGES = "REMOVE_IMAGES",
  LOADING_START = "LOADING_START",
  LOADING_END = "LOADING_END",
  RESET_STATE = "RESET_STATE",
}
