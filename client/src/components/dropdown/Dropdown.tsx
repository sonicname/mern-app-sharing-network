import classNames from "classnames";
import { useRef, useState } from "react";
import useOnClickOutSide from "../../hooks/useOnClickOutSide";
import { IconDropDown } from "../icons";
import { IDropDownProps } from "../../interfaces";

const Dropdown = ({ className, title, children }: IDropDownProps) => {
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  useOnClickOutSide(ref, () => setShow(false));

  return (
    <div
      className={classNames(
        "flex items-center gap-x-1 text-text2 dark:text-text4 font-medium relative cursor-pointer select-none p-4 lg:p-0",
        className
      )}
      onClick={() => setShow(!show)}
      ref={ref}
    >
      <span>{title}</span>
      <IconDropDown className="h-4 w-4" />
      <div
        className={classNames(
          "absolute z-20 top-full right-0 w-full duration-150 bg-white dark:bg-darkSecondary lg:shadow-md lg:w-32 rounded-md mt-2 pl-4 lg:pl-0",
          show ? "scale-100" : "scale-0"
        )}
      >
        <div className="p-1">{children}</div>
      </div>
    </div>
  );
};

export default Dropdown;
