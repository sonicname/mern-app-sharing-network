import { Header } from "./index";
import { ISharedLayoutProps } from "../../interfaces";

const SharedLayout = ({ children }: ISharedLayoutProps) => {
  return (
    <div className="max-w-full min-h-screen bg-lite dark:bg-darkbg dark:text-white">
      <Header />
      {children}
    </div>
  );
};

export default SharedLayout;
