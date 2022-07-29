import { IAuthState } from "./authContext";
import { IAuthAction } from "./authAction";

export const authReducers = (
  state: IAuthState,
  action: IAuthAction
): IAuthState => {
  switch (action.type) {
    default:
      throw new Error(`no such action: ${action.type}!`);
  }
};
