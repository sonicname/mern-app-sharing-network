import Input from "./Input";
import Label from "./Label";
import { IconEyeClose, IconEyeOpen } from "../icons";
import { IFieldAuth } from "../../interfaces";

const Field = ({
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
  defaultValue = "",
}: IFieldAuth) => {
  return (
    <div className="flex flex-col gap-y-1">
      <div className="relative h-[60px]">
        <Input
          type={type}
          name={name}
          placeholder={placeholder}
          control={control}
          defaultValue={defaultValue}
        />
        {hasIcon && <Label htmlFor={name}>{icon ? icon : name}</Label>}
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

export default Field;
