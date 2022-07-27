import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import globalReducers from "./globalReducers";
import { GlobalAction } from "./globalAction";

export interface IGlobalState {
  dark: boolean;
  showMenu: boolean;
  switchDarkMode: () => void;
  changeShowMenu: () => void;
}

const theme = localStorage.getItem("theme");

const GlobalContext = createContext<IGlobalState | null>(null);

const initialState: IGlobalState = {
  dark: theme === "dark",
  showMenu: false,
  switchDarkMode: () => {},
  changeShowMenu: () => {},
};

export const GlobalProvider = (props: { children: ReactNode }) => {
  const [globalState, dispatch] = useReducer(globalReducers, initialState);

  useEffect(() => {
    if (!theme) {
      globalState.dark
        ? localStorage.setItem("theme", "dark")
        : localStorage.setItem("theme", "light");
    } else {
      globalState.dark
        ? localStorage.setItem("theme", "dark")
        : localStorage.setItem("theme", "light");
    }

    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [globalState.dark]);

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
