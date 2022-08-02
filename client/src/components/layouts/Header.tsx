import { NavLink, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { Container } from "./index";
import { Button } from "../index";
import {
  NavHamburger,
  NavLinkItem,
  NavSearch,
  NavSwitchDarkMode,
} from "../navbar";
import { IGlobalState, useGlobalContext } from "../../contexts/global";
import { IAuthState, useAuthContext } from "../../contexts/auth";
import { Dropdown, DropDownItem } from "../dropdown";
import { IconUser, IconLogout } from "../icons";

const Header = () => {
  const navigate = useNavigate();
  const { showMenu, changeShowMenu } = useGlobalContext() as IGlobalState;
  const { username, logout } = useAuthContext() as IAuthState;
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

            <NavSearch placeholder={"Hmm... Cosplay Images"} />
            <NavHamburger
              isActive={showMenu}
              onClick={() => changeShowMenu(!showMenu)}
            />
          </div>

          <div
            className={classNames(
              "bg-white dark:bg-darkSecondary rounded-md fixed inset-0 top-[10%] flex flex-col z-20 p-4 duration-200",
              "lg:flex-row lg:gap-x-8 lg:items-center lg:static lg:bg-transparent lg:dark:bg-transparent lg:p-0 lg:!scale-100",
              showMenu ? "scale-100" : "scale-0"
            )}
          >
            <NavSwitchDarkMode />
            <NavLinkItem to={"/gallery"}>Gallery</NavLinkItem>
            <NavLinkItem to={"/storage"}>Storage</NavLinkItem>
            {username ? (
              <>
                <NavLinkItem to={"/upload"}>Upload</NavLinkItem>
                <Dropdown title={username}>
                  <DropDownItem onClick={() => navigate(`/profile`)}>
                    <IconUser className="w-4 h-4" />
                    <span>Profile</span>
                  </DropDownItem>
                  <DropDownItem onClick={logout}>
                    <IconLogout className="w-4 h-4" />
                    <span>Logout</span>
                  </DropDownItem>
                </Dropdown>
              </>
            ) : (
              <Button primary onClick={() => navigate("/signin")}>
                Get Started
              </Button>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
