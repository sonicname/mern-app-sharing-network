import React, { HTMLInputTypeAttribute } from "react";
import { Control, useController } from "react-hook-form";

interface InputProps {
  type: HTMLInputTypeAttribute;
  name: string;
  placeholder?: string;
  control: Control;
}

const Input = ({ name, type, placeholder, control }: InputProps) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <input
      className="w-full h-full border border-strock px-10 rounded-md outline-none shadow py-[10px] lg:py-[15px] placeholder:text-text4 font-medium text-[14px] text-text1 dark:placeholder:text-text2 dark:text-white dark:bg-transparent dark:border-darkStroke"
      type={type}
      id={name}
      placeholder={placeholder}
      {...field}
    />
  );
};

export default Input;
