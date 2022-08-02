import Toggle from "../Toggle";
import { IGlobalState, useGlobalContext } from "../../contexts/global";
import { IconLight, IconMoon } from "../icons";

const NavSwitchDarkMode = () => {
  const { dark, switchDarkMode } = useGlobalContext() as IGlobalState;
  return (
    <div className="flex items-center gap-x-3 relative p-4 lg:p-0">
      <Toggle on={dark} setOn={switchDarkMode} />
      {dark ? (
        <IconMoon className="h-5 w-5" />
      ) : (
        <IconLight className="w-5 h-5" />
      )}
    </div>
  );
};

export default NavSwitchDarkMode;
