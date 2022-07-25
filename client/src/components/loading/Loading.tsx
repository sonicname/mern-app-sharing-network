import React from "react";
import classNames from "classnames";

export interface ILoadingProps {
  className?: string;
  padding?: 1 | 2 | 3 | 4;
}

const Loading = ({ className, padding = 3 }: ILoadingProps) => {
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
