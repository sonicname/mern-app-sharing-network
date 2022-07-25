import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../buttons";
import { Container } from "./index";
import { NavLinkItem } from "../navbar";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="w-full">
      <Container>
        <div className="flex items-center justify-between gap-x-4">
          <NavLink to="/">
            <p className="text-xl font-bold text-text1">Sharing Network</p>
          </NavLink>

          <div className="flex items-center gap-x-8">
            <NavLinkItem to={"/resources"}>Resources</NavLinkItem>
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
