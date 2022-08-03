import classNames from "classnames";
import { IContainerProps } from "../../interfaces";

const Container = ({ children, isFluid, className }: IContainerProps) => {
  return (
    <div
      className={classNames(
        "mx-auto p-4",
        isFluid ? "max-w-full" : "max-w-[1140px]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
