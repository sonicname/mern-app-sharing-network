import classNames from "classnames";
import { INavHamburger } from "../../interfaces";

const NavHamburger = ({ isActive, onClick }: INavHamburger) => {
  return (
    <div
      onClick={onClick}
      className="lg:hidden flex flex-col items-center justify-between w-[30px] block h-[24px] select-none"
    >
      <span
        className={classNames(
          "w-full h-[4px] rounded bg-darkStroke dark:bg-whiteSoft duration-100",
          isActive && "-rotate-45 translate-y-[10px]"
        )}
      />
      <span
        className={classNames(
          "w-full h-[4px] rounded bg-darkStroke dark:bg-whiteSoft duration-100",
          isActive && "opacity-0"
        )}
      />
      <span
        className={classNames(
          "w-full h-[4px] rounded bg-darkStroke dark:bg-whiteSoft duration-100",
          isActive && "rotate-45 -translate-y-[10px]"
        )}
      />
    </div>
  );
};

export default NavHamburger;
