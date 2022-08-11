import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { authReducers } from "./authReducers";
import { Action } from "./authAction";
import { IAuthInfoBase, IExtentAuthInfo, IUserToken } from "../../interfaces";
import customAPI from "../../apis/CustomAPI";

export interface IAuthState {
  token: string | null;
  username: string | null;
  email: string | null;
  loadingSubmit: boolean;
  signIn: (p: IAuthInfoBase) => Promise<void>;
  signUp: (p: IExtentAuthInfo) => Promise<void>;
  updateUser: (p: IExtentAuthInfo) => Promise<void>;
  logout: () => void;
}

const initialState: IAuthState = {
  token: localStorage.getItem("token"),
  username: localStorage.getItem("username"),
  email: localStorage.getItem("email"),
  loadingSubmit: false,
  signIn: async () => {},
  signUp: async () => {},
  updateUser: async () => {},
  logout: () => {},
};

const AuthContext = createContext<IAuthState>(initialState);

export const AuthProvider = (props: { children: ReactNode }) => {
  const [authState, dispatch] = useReducer(authReducers, initialState);
  const navigate = useNavigate();

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

  const addAllAuthInfo = ({ token, username, email }: IUserToken) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
  };

  const logout = () => {
    dispatch({
      type: Action.SETUP_USER_SUCCESS,
      payload: {
        username: null,
        password: null,
        email: null,
      },
    });

    removeAllAuthInfo();
  };

  const authClient = customAPI({
    token: authState.token,
    logout: () => logout(),
    navigate,
  });

  useEffect(() => {
    checkState("token", authState.token);
    checkState("email", authState.email);
    checkState("username", authState.username);
  }, [authState.token, authState.email, authState.username]);

  const signIn = async ({ email, password }: IAuthInfoBase) => {
    dispatch({ type: Action.SETUP_USER_BEGIN });
    try {
      const { data } = await authClient.post<IUserToken>("/auth/login", {
        email,
        password,
      });

      dispatch({
        type: Action.SETUP_USER_SUCCESS,
        payload: {
          username: data.username,
          email: data.email,
          token: data.token,
        },
      });

      addAllAuthInfo(data);
      toast.success("Login success!");
      navigate("/");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        // @ts-ignore
        toast.error(e.response.data.message);
      }
      dispatch({ type: Action.SETUP_USER_ERROR });
    }
  };

  const updateUser = async ({ username, email, password }: IExtentAuthInfo) => {
    dispatch({ type: Action.SETUP_USER_BEGIN });
    try {
      const { data } = await authClient.patch<IUserToken>("/auth/update", {
        username,
        email,
        password,
      });

      dispatch({
        type: Action.SETUP_USER_SUCCESS,
        payload: {
          username: data.username,
          email: data.email,
          token: data.token,
        },
      });

      addAllAuthInfo(data);
      toast.success("Update profile success!");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        // @ts-ignore
        toast.error(e.response.data.message);
      }
      dispatch({ type: Action.SETUP_USER_ERROR });
    }
  };

  const signUp = async ({ email, password, username }: IExtentAuthInfo) => {
    dispatch({ type: Action.SETUP_USER_BEGIN });
    try {
      const { data } = await authClient.post<IUserToken>("/auth/register", {
        email,
        password,
        username,
      });

      dispatch({
        type: Action.SETUP_USER_SUCCESS,
        payload: {
          username: data.username,
          email: data.email,
          token: data.token,
        },
      });

      addAllAuthInfo(data);
      toast.success("Sign in success!");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        // @ts-ignore
        toast.error(e.response.data.message);
      }
      dispatch({ type: Action.SETUP_USER_ERROR });
    }
  };

  const values = {
    ...authState,
    signIn,
    signUp,
    updateUser,
    logout,
  };

  return <AuthContext.Provider value={values} {...props} />;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("useAuthContext must be used within AuthProvider!");

  return context;
};
