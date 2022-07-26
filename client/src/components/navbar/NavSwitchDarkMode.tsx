import React from "react";
import Toggle from "../Toggle";
import {
  IGlobalState,
  useGlobalContext,
} from "../../contexts/global/globalContext";

const NavSwitchDarkMode = () => {
  const { dark, switchDarkMode } = useGlobalContext() as IGlobalState;
  return (
    <div className="flex items-center gap-x-3 p-4">
      <Toggle on={dark} setOn={switchDarkMode} />
      <span className="font-medium text-md text-text2 dark:text-text4">
        {dark ? "Dark" : "Light"}
      </span>
    </div>
  );
};

export default NavSwitchDarkMode;