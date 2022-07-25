import React from "react";

interface INavSearchProps {
  className?: string;
}

const NavSearch = ({ className }: INavSearchProps) => {
  return (
    <div
      className={`flex-1 relative max-w-[450px] w-full shadow p-2 rounded-lg dark:bg-darkStroke ${className}`}
    >
      <input
        className="text-sm placeholder:text-sm lg:text-md lg:placeholder:text-md w-full h-full p-1 outline-none bg-transparent text-text1 font-medium dark:text-white placeholder:text-text3"
        type="text"
        placeholder="What are you looking for?"
      />
    </div>
  );
};

export default NavSearch;
