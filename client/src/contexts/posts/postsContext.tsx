import {
  ChangeEvent,
  createContext,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { ImageListType } from "react-images-uploading";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { IPost, ITag, IRequestGetTags } from "../../interfaces";
import postsReducers from "./postsReducers";
import customAPI from "../../apis/CustomAPI";
import { Action } from "./postsAction";
import { useAuthContext } from "../auth/authContext";

export interface IPostsState {
  tags: ITag[];
  filterTags: ITag[];
  selectTags: ITag[];
  show: boolean;
  thumbnail: File[];
  images: File[];
  loading: boolean;
  getAllTags: () => Promise<void>;
  createPost: (p: IPost) => Promise<void>;
  handleChangeSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSelectTag: (tag: ITag) => void;
  removeSelectedTag: (tag: ITag) => void;
  getImagesFromDisk: (images: ImageListType) => void;
  getThumbnailFromDisk: (images: ImageListType) => void;
  removeImages: (index: number) => void;
  showFilter: () => void;
  hideFilter: () => void;
}

const initialState: IPostsState = {
  tags: [],
  filterTags: [],
  selectTags: [],
  images: [],
  show: false,
  thumbnail: [],
  loading: false,
  getAllTags: async () => {},
  createPost: async () => {},
  handleChangeSelect: () => {},
  handleSelectTag: () => {},
  removeSelectedTag: () => {},
  getImagesFromDisk: () => {},
  getThumbnailFromDisk: () => {},
  removeImages: () => {},
  showFilter: () => {},
  hideFilter: () => {},
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

  const createPost = async ({
    title,
    description,
    tags,
    thumbnail,
    attachments,
  }: IPost) => {
    dispatch({ type: Action.LOADING_START });
    try {
      if (!attachments || !thumbnail) {
        toast.error("Please add files to upload!");
        return;
      }
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);

      thumbnail.forEach((thumb) => {
        formData.append("thumbnail", thumb.file as File, thumb.name);
      });

      attachments.forEach((attachment) => {
        formData.append(
          "attachments",
          attachment.file as File,
          attachment.name
        );
      });

      tags.forEach((tag) => {
        formData.append("tags", tag._id);
      });

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

  const getAllTags = async () => {
    dispatch({ type: Action.GET_TAGS });
    try {
      const { data } = await axiosInstance.get<IRequestGetTags>("/tags");
      dispatch({ type: Action.GET_TAGS_SUCCESS, payload: data.tags });
    } catch (e) {
      dispatch({ type: Action.GET_TAGS_ERROR });
      toast.error(
        "Something went wrong! error: can't all tags! please try again!"
      );
    }
  };

  const handleChangeSelect = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: Action.SHOW_TAGS_FILTERED });
    let newFilterTags: ITag[] = [];
    if (!e.target.value) {
      newFilterTags = postState.tags;
    } else {
      postState.tags.forEach((tag) => {
        if (tag.name.includes(e.target.value)) {
          newFilterTags.push(tag);
        }
      });
    }

    dispatch({ type: Action.SELECT_TAGS_BEGIN, payload: newFilterTags });
  };

  const handleSelectTag = (tag: ITag) => {
    if (postState.selectTags.includes(tag)) {
      dispatch({ type: Action.HIDE_TAGS_FILTERED });
      return;
    }

    dispatch({
      type: Action.SELECTED_TAGS,
      payload: [...postState.selectTags, tag],
    });
    dispatch({ type: Action.HIDE_TAGS_FILTERED });
  };

  const removeSelectedTag = (tag: ITag) => {
    dispatch({
      type: Action.REMOVE_SELECTED_TAG,
      payload: postState.selectTags.filter((t) => t.name !== tag.name),
    });
  };

  const getImagesFromDisk = (images: ImageListType) => {
    dispatch({
      type: Action.GET_IMAGES_IN_DISK,
      payload: images,
    });
  };

  const getThumbnailFromDisk = (images: ImageListType) => {
    dispatch({
      type: Action.GET_THUMBNAIL_IN_DISK,
      payload: images,
    });
  };

  const removeImages = (index: number) => {
    dispatch({
      type: Action.REMOVE_IMAGES,
      payload: postState.images.filter((img, i) => index !== i),
    });
  };

  const showFilter = () => {
    dispatch({ type: Action.SHOW_TAGS_FILTERED });
  };

  const hideFilter = () => {
    dispatch({ type: Action.HIDE_TAGS_FILTERED });
  };

  const values = {
    ...postState,
    getAllTags,
    handleChangeSelect,
    handleSelectTag,
    removeSelectedTag,
    getImagesFromDisk,
    getThumbnailFromDisk,
    removeImages,
    createPost,
    showFilter,
    hideFilter,
  };

  return <PostsContext.Provider value={values} {...props} />;
};

export const usePostsContext = () => {
  const context = useContext(PostsContext);
  if (typeof context === "undefined")
    throw new Error("usePosts must be used within PostsProvider!");

  return context;
};
