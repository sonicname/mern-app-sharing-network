export interface IGlobalAction {
  type: Action;
  payload?: any;
}

export enum Action {
  CHANGE_DARKMODE = "CHANGE_DARKMODE",
  SET_SHOW = "SET_SHOW",
  TOGGLE_SHOW_PASS = "TOGGLE_SHOW_PASS",
}
