import { IGlobalState } from "./globalContext";
import { Action, IGlobalAction } from "./globalAction";

export default function globalReducers(
  state: IGlobalState,
  action: IGlobalAction
): IGlobalState {
  switch (action.type) {
    case Action.CHANGE_DARKMODE: {
      return {
        ...state,
        dark: !state.dark,
      };
    }

    case Action.SET_SHOW: {
      return {
        ...state,
        showMenu: action.payload,
      };
    }

    case Action.TOGGLE_SHOW_PASS: {
      return {
        ...state,
        showPass: !state.showPass,
      };
    }

    default: {
      throw new Error(`no such action: ${action.type}!`);
    }
  }
}
