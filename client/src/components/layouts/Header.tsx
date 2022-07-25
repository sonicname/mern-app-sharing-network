import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../buttons";
import { Container } from "./index";
import { NavLinkItem } from "../navbar";
import NavSearch from "../navbar/NavSearch";
import NavHamburger from "../navbar/NavHamburger";
import { useState } from "react";
import classNames from "classnames";

const Header = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  return (
    <header className="w-full dark:bg-darkbg">
      <Container isFluid>
        <div className="lg:flex lg:items-center lg:justify-between lg:gap-x-4 relative">
          <div className="flex items-center justify-between lg:justify-start gap-x-6 flex-1">
            <NavLink to="/">
              <p className="text-sm lg:text-xl font-bold text-text1 dark:text-white">
                Sharing
              </p>
            </NavLink>

            <NavSearch />
            <NavHamburger isActive={show} onClick={() => setShow(!show)} />
          </div>

          <div
            className={classNames(
              "shadow-lg opacity-0 invisible rounded-md absolute bg-white top-[150%] right-0 left-0 flex flex-col p-4 lg:p-0 right-0 lg:flex-row lg:gap-x-8 lg:items-center lg:static lg:max-w-full lg:w-auto lg:rounded-none lg:shadow-none lg:opacity-100 lg:visible duration-100",
              show && "!opacity-100 !visible"
            )}
          >
            <NavLinkItem to={"/gallery"}>Gallery</NavLinkItem>
            <NavLinkItem to={"/about"}>About me</NavLinkItem>
            <div className="flex-1 mt-auto">
              <Button primary onClick={() => navigate("/signin")}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
