import { ChangeEvent, HTMLInputTypeAttribute, ReactNode } from "react";
import { Control } from "react-hook-form";

interface IClassName {
  className?: string;
}

interface IOnClick {
  onClick?: () => void;
}

interface IChildren {
  children: ReactNode;
}

interface IBaseInput {
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  defaultValue?: string;
  name: string;
  control: Control;
}

export interface IDropDownItemProps extends IClassName, IOnClick, IChildren {}
export interface InputProps extends IBaseInput {}
export interface IconProps extends IClassName, IOnClick {}
export interface ISharedLayoutProps extends IChildren {}

export interface IDropDownProps extends IClassName, IChildren {
  title: string;
}

export interface IFieldAuth extends IBaseInput {
  icon?: JSX.Element;
  error?: string;
  hasIcon?: boolean;
  isPasswordField?: boolean;
  onClickIconPass?: () => void;
  showPass?: boolean;
}

export interface ILabelProps extends IChildren {
  htmlFor: string;
}

export interface IContainerProps extends IChildren, IClassName {
  isFluid?: boolean;
}

export interface INavHamburger extends IOnClick {
  isActive: boolean;
}

export interface INavLinkProps extends IChildren, IClassName {
  to: string;
}

export interface INavSearchProps extends IClassName {
  placeholder?: string;
}

export interface IButtonProps extends IChildren, IClassName, IOnClick {
  isLoading?: boolean;
  primary?: boolean;
  type?: "button" | "submit" | "reset";
}

export interface ILoadingProps extends IClassName {
  padding?: 1 | 2 | 3 | 4;
}

export interface IToggleProps {
  on: boolean;
  setOn: () => void;
}

export interface ISelectProps extends IChildren {
  handleChangeSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClickSelect: () => void;
}

export interface IProtectedPageProps extends IChildren {}
