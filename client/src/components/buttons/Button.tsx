import { ReactNode } from "react";
import classNames from "classnames";
import Loading from "../loading/Loading";

export interface IButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  isLoading?: boolean;
  primary?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button = ({
  children,
  onClick,
  className,
  isLoading,
  primary,
  type,
}: IButtonProps) => {
  return (
    <button
      type={type}
      className={classNames(
        "relative px-6 py-3 text-white font-semibold rounded-lg shadow-lg hover:opacity-75 duration-75",
        primary
          ? `bg-primary text-white border border-primary`
          : "bg-transparent text-text1 border border-gray-400",
        isLoading && "text-transparent",
        className
      )}
      onClick={onClick}
      disabled={isLoading}
    >
      {children}
      {isLoading && (
        <div
          className={classNames(
            "absolute inset-0 rounded-xl",
            primary ? "bg-primary" : "bg-transparent"
          )}
        >
          <Loading padding={3} />
        </div>
      )}
    </button>
  );
};

export default Button;
