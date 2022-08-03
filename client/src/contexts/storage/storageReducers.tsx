import { IStorageState } from "./storageContext";
import { IStorageAction, Action } from "./storageAction";
//TODO
export const storageReducers = (
  state: IStorageState,
  action: IStorageAction
): IStorageState => {
  switch (action.type) {
    default:
      throw new Error(`no such action: ${action.type}!`);
  }
};
