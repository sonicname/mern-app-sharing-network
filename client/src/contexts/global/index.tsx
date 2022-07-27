import { IGlobalAction, GlobalAction } from "./globalAction";

import {
  IGlobalState,
  GlobalProvider,
  useGlobalContext,
} from "./globalContext";

import globalReducers from "./globalReducers";

export { useGlobalContext, GlobalAction, GlobalProvider, globalReducers };
export type { IGlobalState, IGlobalAction };
