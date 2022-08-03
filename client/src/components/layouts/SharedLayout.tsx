import { ISharedLayoutProps } from "../../interfaces";
import { Header } from "../index";

const SharedLayout = ({ children }: ISharedLayoutProps) => {
  return (
    <div className="max-w-full min-h-screen bg-lite dark:bg-darkbg dark:text-white">
      <Header />
      {children}
    </div>
  );
};

export default SharedLayout;
