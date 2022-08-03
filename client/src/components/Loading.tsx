import React from "react";
import classNames from "classnames";
import { ILoadingProps } from "../interfaces";

const Loading = ({ className, padding = 2 }: ILoadingProps) => {
  return (
    <div
      className={classNames(
        "flex items-center justify-center w-full h-full",
        className
      )}
    >
      <div
        className={`p-${padding} border-4 border-white-400 border-t-transparent rounded-full animate-spin`}
      />
    </div>
  );
};

export default Loading;
