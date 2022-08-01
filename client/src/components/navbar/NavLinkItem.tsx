import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

interface INavLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

const NavLinkItem = ({ to, children, className }: INavLinkProps) => {
  return (
    <NavLink
      className={classNames(
        "flex items-center w-full p-4 items-center gap-x-1 font-medium text-md text-text2 dark:text-text4 lg:p-0 lg:w-auto relative nav",
        className
      )}
      to={to}
    >
      {children}
    </NavLink>
  );
};

export default NavLinkItem;
