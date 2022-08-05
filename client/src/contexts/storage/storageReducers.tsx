import { IStorageState } from "./storageContext";
import { Action, IStorageAction } from "./storageAction";
//TODO
export const storageReducers = (
  state: IStorageState,
  action: IStorageAction
): IStorageState => {
  switch (action.type) {
    case Action.UPLOAD_BEGIN: {
      return {
        ...state,
        uploadLoading: true,
      };
    }

    case Action.UPLOAD_SUCCESS: {
      return {
        ...state,
        uploadLoading: false,
      };
    }

    case Action.UPLOAD_ERROR: {
      return {
        ...state,
        uploadLoading: false,
      };
    }
    default:
      throw new Error(`no such action: ${action.type}!`);
  }
};
