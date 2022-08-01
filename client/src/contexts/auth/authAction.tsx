//TODO
export enum Action {
  SETUP_USER_BEGIN = "SETUP_USER_BEGIN",
  SETUP_USER_SUCCESS = "SETUP_USER_SUCCESS",
  SETUP_USER_ERROR = "SETUP_USER_ERROR",
}

export interface IAuthAction {
  type: Action;
  payload?: any;
}
