import React from "react";
import Toggle from "../Toggle";
import { IGlobalState, useGlobalContext } from "../../contexts/global";
import IconMoon from "../icons/IconMoon";
import IconLight from "../icons/IconLight";

const NavSwitchDarkMode = () => {
  const { dark, switchDarkMode } = useGlobalContext() as IGlobalState;
  return (
    <div className="flex items-center gap-x-3 relative">
      <Toggle on={dark} setOn={switchDarkMode} />
      {dark ? <IconMoon /> : <IconLight />}
    </div>
  );
};

export default NavSwitchDarkMode;
