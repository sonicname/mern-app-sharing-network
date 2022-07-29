import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { authReducers } from "./authReducers";

export interface IAuthState {
  token: string | null;
  username: string | null;
  email: string | null;
}

const AuthContext = createContext<IAuthState | null>(null);

const token = localStorage.getItem("token");
const username = localStorage.getItem("username");
const email = localStorage.getItem("email");

const initialState: IAuthState = {
  token,
  username,
  email,
};

export const AuthProvider = (props: { children: ReactNode }) => {
  const [authState, dispatch] = useReducer(authReducers, initialState);

  const checkState = (type: string, data: string | null) => {
    if (data) {
      localStorage.setItem(type, data);
    } else {
      localStorage.removeItem(type);
    }
  };

  const removeAllAuthInfo = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
  };

  useEffect(() => {
    checkState("token", authState.token);
    checkState("email", authState.email);
    checkState("username", authState.username);
  }, [authState.token, authState.email, authState.username]);

  const values = {
    ...authState,
  };

  return <AuthContext.Provider value={values} {...props} />;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("useAuthContext must be used within AuthProvider!");

  return context;
};
