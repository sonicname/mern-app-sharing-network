import { ReactNode } from "react";
import { Header } from "./index";

interface ISharedLayoutProps {
  children: ReactNode;
}

const SharedLayout = ({ children }: ISharedLayoutProps) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default SharedLayout;
