import { createContext, ReactNode, useContext, useReducer } from "react";
import { storageReducers } from "./storageReducers";
//TODO
export interface IStorageState {}

const StorageContext = createContext<IStorageState | null>(null);

const initialStorageState: IStorageState = {};

export const StorageProvider = (props: { children: ReactNode }) => {
  const [storageState, dispatch] = useReducer(
    storageReducers,
    initialStorageState
  );
  return <StorageContext.Provider value={null} {...props} />;
};

export const useStorageContext = () => {
  const context = useContext(StorageContext);
  if (typeof context === "undefined")
    throw new Error("useStorageContext must be used within StorageProvider!");

  return context;
};
