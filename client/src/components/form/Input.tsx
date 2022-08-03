import { useController } from "react-hook-form";
import classNames from "classnames";
import { InputProps } from "../../interfaces";

const Input = ({
  name,
  type,
  placeholder,
  control,
  defaultValue = "",
}: InputProps) => {
  const { field } = useController({
    control,
    name,
    defaultValue,
  });
  return (
    <input
      className={classNames(
        "w-full h-full border border-strock px-10 pr-14 rounded-md outline-none shadow py-[10px] lg:py-[15px] placeholder:text-text4 font-medium text-[14px] text-text1 dark:placeholder:text-text2 dark:text-white dark:bg-transparent dark:border-darkStroke"
      )}
      type={type}
      id={name}
      placeholder={placeholder}
      {...field}
    />
  );
};

export default Input;
