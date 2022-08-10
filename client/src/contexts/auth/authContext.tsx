import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { authReducers } from "./authReducers";
import { Action } from "./authAction";
import { IAuthInfoBase, IExtentAuthInfo, IUserToken } from "../../interfaces";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IPost } from "../../interfaces/auth";

export interface IAuthState {
  token: string | null;
  username: string | null;
  email: string | null;
  loadingSubmit: boolean;
  signIn: (p: IAuthInfoBase) => Promise<void>;
  signUp: (p: IExtentAuthInfo) => Promise<void>;
  updateUser: (p: IExtentAuthInfo) => Promise<void>;
  createPost: (p: IPost) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<IAuthState | null>(null);

const token = localStorage.getItem("token");
const username = localStorage.getItem("username");
const email = localStorage.getItem("email");

const initialState: IAuthState = {
  token,
  username,
  email,
  loadingSubmit: false,
  signIn: async () => {},
  signUp: async () => {},
  updateUser: async () => {},
  logout: () => {},
  createPost: async () => {},
};

export const AuthProvider = (props: { children: ReactNode }) => {
  const [authState, dispatch] = useReducer(authReducers, initialState);
  const navigate = useNavigate();

  axios.defaults.headers.common["Authorization"] = `Bearer ${authState.token}`;

  const authClient = axios.create({
    baseURL: "/api/v1/",
    headers: {
      Authorization: `Bearer ${authState.token}`,
    },
  });

  authClient.interceptors.request.use(
    (config) => {
      // @ts-ignore
      config.headers.common["Authorization"] = `Bearer ${authState.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authClient.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      if (error.response.status === 401) {
        logout();
        navigate("/signin");
      }

      return Promise.reject(error);
    }
  );

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

  const createPost = async ({
    tags,
    thumbnail,
    title,
    description,
    attachments,
  }: IPost) => {
    if (!attachments || !thumbnail) {
      toast.error("Please add files to upload!");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    thumbnail.forEach((thumb) => {
      formData.append("thumbnail", thumb, thumb.name);
    });
    attachments.forEach((attachment) => {
      formData.append("attachments", attachment, attachment.name);
    });
    tags.forEach((tag) => {
      formData.append("tags", tag._id);
    });

    try {
      await authClient.post("/post/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Created post success!");
      navigate("/");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        // @ts-ignore
        toast.error(e.response.data.message);
      }
    }
  };

  const values = {
    ...authState,
    signIn,
    signUp,
    updateUser,
    logout,
    createPost,
  };

  return <AuthContext.Provider value={values} {...props} />;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("useAuthContext must be used within AuthProvider!");

  return context;
};
