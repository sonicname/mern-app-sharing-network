import { IGlobalState } from "./globalContext";
import { GlobalAction, IGlobalAction } from "./globalAction";

export default function globalReducers(
  state: IGlobalState,
  action: IGlobalAction
): IGlobalState {
  switch (action.type) {
    case GlobalAction.CHANGE_DARKMODE: {
      return {
        ...state,
        dark: !state.dark,
      };
    }

    case GlobalAction.SET_SHOW: {
      return {
        ...state,
        showMenu: !state.showMenu,
      };
    }

    default: {
      throw new Error(`no such action: ${action.type}!`);
    }
  }
}
