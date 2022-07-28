import { HTMLInputTypeAttribute } from "react";
import Input from "./Input";
import { Control } from "react-hook-form";
import LabelAuth from "./LabelAuth";
import IconEyeOpen from "../icons/IconEyeOpen";
import IconEyeClose from "../icons/IconEyeClose";

interface IFieldAuth {
  control: Control;
  type: HTMLInputTypeAttribute;
  name: string;
  placeholder?: string;
  icon?: JSX.Element;
  error?: string;
  hasIcon?: boolean;
  isPasswordField?: boolean;
  onClickIconPass?: () => void;
  showPass?: boolean;
}

const FieldAuth = ({
  control,
  type,
  name,
  placeholder = "...",
  icon,
  error,
  hasIcon = icon !== undefined,
  isPasswordField = type === "password",
  onClickIconPass = () => {},
  showPass,
}: IFieldAuth) => {
  return (
    <div className="flex flex-col gap-y-1 h-full">
      <div className="relative h-[52px] h-[60px]">
        <Input
          type={type}
          name={name}
          placeholder={placeholder}
          control={control}
        />
        {hasIcon && <LabelAuth htmlFor={name}>{icon ? icon : name}</LabelAuth>}
        {isPasswordField && (
          <div
            className="absolute top-2/4 right-0 -translate-y-2/4 pr-4 cursor-pointer select-none"
            onClick={onClickIconPass}
          >
            {showPass ? (
              <IconEyeClose className="w-4 h-4" />
            ) : (
              <IconEyeOpen className="w-4 h-4" />
            )}
          </div>
        )}
      </div>
      {(error || error !== "") && (
        <p className="text-error font-medium text-[14px] pl-1">{error}</p>
      )}
    </div>
  );
};

export default FieldAuth;
