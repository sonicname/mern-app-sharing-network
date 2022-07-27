import { HTMLInputTypeAttribute } from "react";
import Input from "./Input";
import { Control } from "react-hook-form";
import LabelAuth from "./LabelAuth";

interface IFieldAuth {
  control: Control;
  type: HTMLInputTypeAttribute;
  name: string;
  placeholder?: string;
  icon?: JSX.Element;
  error?: string;
}

const FieldAuth = ({
  control,
  type,
  name,
  placeholder = "...",
  icon,
  error,
}: IFieldAuth) => {
  return (
    <div className="flex flex-col gap-y-1">
      <div className="relative">
        <Input
          type={type}
          name={name}
          placeholder={placeholder}
          control={control}
        />
        <LabelAuth htmlFor={name}>{icon ? icon : name}</LabelAuth>
      </div>
      {(error || error !== "") && (
        <p className="text-error font-medium text-[14px] pl-3">{error}</p>
      )}
    </div>
  );
};

export default FieldAuth;
