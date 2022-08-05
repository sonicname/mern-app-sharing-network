import { createContext, ReactNode, useContext, useReducer } from "react";
import { storageReducers } from "./storageReducers";
import { Action } from "./storageAction";
import axios from "axios";
import { toast } from "react-toastify";
//TODO
export interface IStorageState {
  uploadLoading: boolean;
  uploadImage: (file: File[]) => Promise<void>;
}

const StorageContext = createContext<IStorageState | null>(null);

const initialStorageState: IStorageState = {
  uploadLoading: false,
  uploadImage: async () => {},
};

export const StorageProvider = (props: { children: ReactNode }) => {
  const token = localStorage.getItem("token");
  const [storageState, dispatch] = useReducer(
    storageReducers,
    initialStorageState
  );

  const uploadImage = async (files: File[]) => {
    dispatch({ type: Action.UPLOAD_BEGIN });
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("attachments", file);
      });
      const { data } = await axios.post("/api/v1/storage/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Upload success!");
      dispatch({ type: Action.UPLOAD_SUCCESS });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        // @ts-ignore
        toast.error(e.response.data.message);
      }
      dispatch({ type: Action.UPLOAD_ERROR });
    }
  };

  const values = {
    ...storageState,
    uploadImage,
  };

  return <StorageContext.Provider value={values} {...props} />;
};

export const useStorageContext = () => {
  const context = useContext(StorageContext);
  if (typeof context === "undefined")
    throw new Error("useStorageContext must be used within StorageProvider!");

  return context;
};
