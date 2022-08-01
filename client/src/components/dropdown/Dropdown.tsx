import classNames from "classnames";
import { ReactNode, useRef, useState } from "react";
import IconDropDown from "../icons/IconDropDown";
import useOnClickOutSide from "../../hooks/useOnClickOutSide";

interface IDropDownProps {
  className?: string;
  title: string;
  children: ReactNode;
}

const Dropdown = ({ className, title, children }: IDropDownProps) => {
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  useOnClickOutSide(ref, () => setShow(false));

  return (
    <div
      className={classNames(
        "flex items-center gap-x-1 text-text1 dark:text-text4 font-medium relative cursor-pointer select-none p-4 lg:p-0",
        className
      )}
      onClick={() => setShow(!show)}
      ref={ref}
    >
      {title} <IconDropDown className="h-4 w-4" />
      <div
        className={classNames(
          "absolute top-full right-0 w-full duration-150 bg-white dark:bg-darkSecondary lg:shadow-md lg:w-32 rounded-md mt-2 pl-4 lg:pl-0",
          show ? "scale-100" : "scale-0"
        )}
      >
        <div className="p-1">{children}</div>
      </div>
    </div>
  );
};

export default Dropdown;
