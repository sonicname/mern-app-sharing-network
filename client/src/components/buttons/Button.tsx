import { ReactNode } from "react";
import classNames from "classnames";
import Loading from "../loading/Loading";

interface IButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  type: string;
  isLoading?: boolean;
}

const Button = ({
  children,
  onClick,
  className,
  type,
  isLoading,
}: IButtonProps) => {
  return (
    <button
      className={classNames(
        "relative p-3 text-white font-semibold rounded-xl shadow-sm hover:opacity-75 duration-75",
        `bg-${type}`,
        className
      )}
      onClick={onClick}
      disabled={isLoading}
    >
      {children}
      {isLoading && (
        <div className={`absolute inset-0 bg-${type} rounded-xl`}>
          <Loading padding={2} />
        </div>
      )}
    </button>
  );
};

export default Button;
