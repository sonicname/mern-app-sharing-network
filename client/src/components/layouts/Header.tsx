import { NavLink, useNavigate } from "react-router-dom";
import { Container } from "./index";
import classNames from "classnames";
import { Button } from "../index";
import { NavHamburger, NavLinkItem, NavSearch } from "../navbar";
import {
  IGlobalState,
  useGlobalContext,
} from "../../contexts/global/globalContext";

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
              "shadow-lg opacity-0 invisible rounded-md absolute top-[150%] right-0 left-0 flex flex-col p-4 lg:p-0 right-0 lg:flex-row lg:gap-x-8 lg:items-center lg:static lg:rounded-none lg:shadow-none lg:opacity-100 lg:visible",
              showMenu && "!opacity-100 !visible bg-white"
            )}
          >
            <NavLinkItem to={"/gallery"}>Gallery</NavLinkItem>
            <NavLinkItem to={"/about"}>About me</NavLinkItem>
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
