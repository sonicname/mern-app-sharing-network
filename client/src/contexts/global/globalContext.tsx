import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import globalReducers from "./globalReducers";
import { Action } from "./globalAction";

export interface IGlobalState {
  dark: boolean;
  showMenu: boolean;
  showPass: boolean;
  switchDarkMode: () => void;
  changeShowMenu: (v: boolean) => void;
  toggleShowPass: () => void;
}

const theme = localStorage.getItem("theme");

const initialState: IGlobalState = {
  dark: theme === "dark",
  showMenu: false,
  showPass: false,
  switchDarkMode: () => {},
  changeShowMenu: () => {},
  toggleShowPass: () => {},
};

const GlobalContext = createContext<IGlobalState>(initialState);

export const GlobalProvider = (props: { children: ReactNode }) => {
  const [globalState, dispatch] = useReducer(globalReducers, initialState);

  // check darkmode
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
    dispatch({ type: Action.CHANGE_DARKMODE });
  };

  const changeShowMenu = (value: boolean) => {
    dispatch({ type: Action.SET_SHOW, payload: value });
  };

  const toggleShowPass = () => {
    dispatch({ type: Action.TOGGLE_SHOW_PASS });
  };

  const values = {
    ...globalState,
    switchDarkMode,
    changeShowMenu,
    toggleShowPass,
  };

  return <GlobalContext.Provider value={values} {...props} />;
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (typeof context === "undefined")
    throw new Error("useGlobalContext must be used within GlobalProvider!");

  return context;
};
