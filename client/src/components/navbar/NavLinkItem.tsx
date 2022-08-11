import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { INavLinkProps } from "../../interfaces";
import { useGlobalContext } from "../../contexts/global";

const NavLinkItem = ({ to, children, className }: INavLinkProps) => {
  const { changeShowMenu } = useGlobalContext();
  return (
    <NavLink
      className={classNames(
        "flex items-center w-full p-3 lg:p-4 items-center gap-x-1 font-medium text-md text-text2 dark:text-text4 lg:p-0 lg:w-auto relative select-none",
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
