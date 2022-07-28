import { IGlobalAction, Action } from "./globalAction";

import {
  IGlobalState,
  GlobalProvider,
  useGlobalContext,
} from "./globalContext";

import globalReducers from "./globalReducers";

export { useGlobalContext, Action, GlobalProvider, globalReducers };
export type { IGlobalState, IGlobalAction };
