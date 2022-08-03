import { INavSearchProps } from "../../interfaces";

const NavSearch = ({ className, placeholder }: INavSearchProps) => {
  return (
    <div
      className={`flex-1 relative max-w-[450px] w-full shadow p-2 rounded-lg dark:bg-darkStroke ${className}`}
    >
      <input
        className="text-sm placeholder:text-sm lg:text-md lg:placeholder:text-md w-full h-full p-1 outline-none bg-transparent text-text1 font-medium dark:text-white placeholder:text-text3"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};

export default NavSearch;
