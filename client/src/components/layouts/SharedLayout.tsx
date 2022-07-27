import { ReactNode } from "react";
import { Header } from "./index";

interface ISharedLayoutProps {
  children: ReactNode;
}

const SharedLayout = ({ children }: ISharedLayoutProps) => {
  return (
    <div className="max-w-full min-h-screen flex flex-col bg-lite dark:bg-darkbg dark:text-white">
      <Header />
      {children}
    </div>
  );
};

export default SharedLayout;
