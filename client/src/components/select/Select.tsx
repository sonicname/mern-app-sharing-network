import { IconDropDown, IconTag } from "../icons";
import { ISelectProps } from "../../interfaces";

const Select = ({
  handleChangeSelect,
  handleClickSelect,
  children,
  placeholder,
}: ISelectProps) => {
  return (
    <div className="relative h-[60px]">
      <input
        type="text"
        className="w-full h-full border border-strock px-10 pr-14 rounded-md outline-none shadow py-[10px] lg:py-[15px] placeholder:text-text4 font-medium text-[14px] text-text1 dark:placeholder:text-text2 dark:text-white dark:bg-transparent dark:border-darkStroke"
        placeholder={placeholder}
        onChange={handleChangeSelect}
        onClick={handleClickSelect}
      />
      <div className="absolute top-2/4 left-0 -translate-y-2/4 pr-4 cursor-pointer select-none pl-4">
        <IconTag />
      </div>
      <div className="absolute top-2/4 right-0 -translate-y-2/4 pr-4 cursor-pointer select-none">
        <IconDropDown />
      </div>

      {children}
    </div>
  );
};

export default Select;
