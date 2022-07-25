import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface INavLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

const NavLinkItem = ({ to, children, className }: INavLinkProps) => {
  return (
    <div className="flex w-full p-4 items-center gap-x-1 font-medium text-md text-text2 hover:opacity-75 duration-50 dark:text-text4 lg:p-0 lg:w-auto">
      <NavLink className={className} to={to}>
        {children}
      </NavLink>
    </div>
  );
};

export default NavLinkItem;
