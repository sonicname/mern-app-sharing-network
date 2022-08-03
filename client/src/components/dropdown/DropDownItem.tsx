import classNames from "classnames";
import { IDropDownItemProps } from "../../interfaces";

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
