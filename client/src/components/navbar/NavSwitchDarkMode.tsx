import Toggle from "../Toggle";
import { IconLight, IconMoon } from "../icons";
import { useGlobalContext } from "../../contexts/global";

const NavSwitchDarkMode = () => {
  const { dark, switchDarkMode } = useGlobalContext();
  return (
    <div className="flex items-center gap-x-3 relative p-3 lg:p-0">
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
