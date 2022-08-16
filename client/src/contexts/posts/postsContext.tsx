import { createContext, ReactNode, useContext, useReducer } from "react";
import { ImageListType } from "react-images-uploading";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { IPost } from "../../interfaces";
import postsReducers from "./postsReducers";
import customAPI from "../../apis/CustomAPI";
import { Action } from "./postsAction";
import { useAuthContext } from "../auth/authContext";

export interface IPostsState {
  images: File[];
  loading: boolean;
  createPost: (p: IPost) => Promise<void>;
  getImagesFromDisk: (images: ImageListType) => void;
  removeImages: (index: number) => void;
}

const initialState: IPostsState = {
  images: [],
  loading: false,
  createPost: async () => {},
  getImagesFromDisk: () => {},
  removeImages: () => {},
};

const PostsContext = createContext<IPostsState>(initialState);

export const PostsProvider = (props: { children: ReactNode }) => {
  const [postState, dispatch] = useReducer(postsReducers, initialState);
  const { token, logout } = useAuthContext();
  const navigate = useNavigate();

  const axiosInstance = customAPI({
    token,
    logout,
    navigate,
  });

  const createPost = async ({ title, description, attachment }: IPost) => {
    dispatch({ type: Action.LOADING_START });
    try {
      if (!attachment) {
        toast.error("Please add files to upload!");
        return;
      }
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append(
        "attachment",
        attachment[0].file as File,
        attachment[0].file?.name
      );

      await axiosInstance.post("/post/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch({ type: Action.RESET_STATE });
      toast.success("Created post success!");
      navigate("/");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        // @ts-ignore
        toast.error(e.response.data.message);
      }
      dispatch({ type: Action.LOADING_END });
    }
  };

  const getImagesFromDisk = (images: ImageListType) => {
    dispatch({
      type: Action.GET_IMAGES_IN_DISK,
      payload: images,
    });
  };

  const removeImages = (index: number) => {
    dispatch({
      type: Action.REMOVE_IMAGES,
      payload: postState.images.filter((img, i) => index !== i),
    });
  };

  const values = {
    ...postState,
    getImagesFromDisk,
    removeImages,
    createPost,
  };

  return <PostsContext.Provider value={values} {...props} />;
};

export const usePostsContext = () => {
  const context = useContext(PostsContext);
  if (typeof context === "undefined")
    throw new Error("usePosts must be used within PostsProvider!");

  return context;
};
