import { ReactNode } from "react";
import classNames from "classnames";

interface IDropDownItemProps {
  className?: string;
  children: ReactNode;
  onClick: () => void;
}

const DropDownItem = ({ children, className, onClick }: IDropDownItemProps) => {
  return (
    <div
      className={classNames(
        "block w-full p-2 hover:bg-primary hover:text-white rounded-md font-medium cursor-pointer flex items-center gap-x-3",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default DropDownItem;
