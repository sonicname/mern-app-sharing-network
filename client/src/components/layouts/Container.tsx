import { ReactNode } from "react";
import classNames from "classnames";

interface IContainerProps {
  children: ReactNode;
  isFluid?: boolean;
}

const Container = ({ children, isFluid }: IContainerProps) => {
  return (
    <div
      className={classNames(
        "mx-auto p-4",
        isFluid ? "max-w-full" : "max-w-[1140px]"
      )}
    >
      {children}
    </div>
  );
};

export default Container;
