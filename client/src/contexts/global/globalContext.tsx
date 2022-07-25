import { createContext, ReactNode, useContext, useReducer } from "react";
import globalReducers from "./globalReducers";
import { GlobalAction } from "./globalAction";

export interface IGlobalState {
  dark: boolean;
  showMenu: boolean;
  switchDarkMode: () => void;
  changeShowMenu: () => void;
}

const GlobalContext = createContext<IGlobalState | null>(null);

const initialState: IGlobalState = {
  dark: false,
  showMenu: false,
  switchDarkMode: () => {},
  changeShowMenu: () => {},
};

export const GlobalProvider = (props: { children: ReactNode }) => {
  const [globalState, dispatch] = useReducer(globalReducers, initialState);

  const switchDarkMode = () => {
    dispatch({ type: GlobalAction.CHANGE_DARKMODE });
  };

  const changeShowMenu = () => {
    dispatch({ type: GlobalAction.SET_SHOW });
  };

  const values = {
    ...globalState,
    switchDarkMode,
    changeShowMenu,
  };

  return <GlobalContext.Provider value={values} {...props} />;
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (typeof context === "undefined")
    throw new Error("useGlobalContext must be used within GlobalProvider!");

  return context;
};
