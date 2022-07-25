export interface IGlobalAction {
  type: GlobalAction;
  payload?: any;
}

export enum GlobalAction {
  CHANGE_DARKMODE = "CHANGE_DARKMODE",
  SET_SHOW = "SET_SHOW",
}
