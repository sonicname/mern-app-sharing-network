import { NavLink, useNavigate } from "react-router-dom";
import { Container } from "./index";
import classNames from "classnames";
import { Button } from "../index";
import { NavHamburger, NavLinkItem, NavSearch } from "../navbar";
import { IGlobalState, useGlobalContext } from "../../contexts/global";
import NavSwitchDarkMode from "../navbar/NavSwitchDarkMode";

const Header = () => {
  const navigate = useNavigate();
  const { showMenu, changeShowMenu } = useGlobalContext() as IGlobalState;
  return (
    <header className="w-full dark:bg-darkbg">
      <Container isFluid>
        <div className="lg:flex lg:items-center lg:justify-between lg:gap-x-4 relative">
          <div className="flex items-center justify-between lg:justify-start gap-x-6 flex-1">
            <NavLink to="/">
              <p className="text-md lg:text-xl font-bold text-text1 dark:text-white">
                Sharing
              </p>
            </NavLink>

            <NavSearch placeholder={"What...."} />
            <NavHamburger isActive={showMenu} onClick={changeShowMenu} />
          </div>

          <div
            className={classNames(
              "shadow-lg bg-white dark:bg-darkSecondary scale-0 invisible rounded-md fixed inset-0 top-[10%] flex flex-col p-4 right-0 z-20 duration-200",
              "lg:flex-row lg:gap-x-8 lg:items-center lg:static lg:rounded-none lg:shadow-none lg:opacity-100 lg:visible lg:bg-transparent lg:dark:bg-transparent lg:p-0 lg:scale-100",
              showMenu && "!scale-100 !visible"
            )}
          >
            <NavSwitchDarkMode />
            <NavLinkItem to={"/gallery"}>Gallery</NavLinkItem>
            <NavLinkItem to={"/storage"}>Storage</NavLinkItem>
            <Button primary onClick={() => navigate("/signin")}>
              Get Started
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
