import { IAuthState } from "./authContext";
import { Action, IAuthAction } from "./authAction";

export const authReducers = (
  state: IAuthState,
  action: IAuthAction
): IAuthState => {
  switch (action.type) {
    case Action.SETUP_USER_BEGIN: {
      return {
        ...state,
        loadingSubmit: true,
      };
    }

    case Action.SETUP_USER_SUCCESS: {
      return {
        ...state,
        loadingSubmit: false,
        username: action.payload.username,
        email: action.payload.email,
        token: action.payload.token,
      };
    }

    case Action.SETUP_USER_ERROR: {
      return {
        ...state,
        loadingSubmit: false,
      };
    }

    default:
      throw new Error(`no such action: ${action.type}!`);
  }
};
