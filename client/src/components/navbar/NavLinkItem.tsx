import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { IGlobalState, useGlobalContext } from "../../contexts/global";

interface INavLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

const NavLinkItem = ({ to, children, className }: INavLinkProps) => {
  const { changeShowMenu } = useGlobalContext() as IGlobalState;
  return (
    <NavLink
      className={classNames(
        "flex items-center w-full p-4 items-center gap-x-1 font-medium text-md text-text2 dark:text-text4 lg:p-0 lg:w-auto relative select-none",
        className
      )}
      to={to}
      onClick={() => changeShowMenu(false)}
    >
      {children}
    </NavLink>
  );
};

export default NavLinkItem;
