import classNames from "classnames";
import { IToggleProps } from "../interfaces";

const Toggle = ({ on, setOn }: IToggleProps) => {
  return (
    <button
      onClick={setOn}
      className={classNames(
        "relative flex items-center h-[28px] w-[54px] lg:h-[34px] lg:w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
        on ? "bg-primary" : "bg-gray-400"
      )}
    >
      <span
        className={classNames(
          "pointer-events-none inline-block h-[24px] lg:h-[30px] w-[24px] lg:w-[30px] transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out",
          on ? "translate-x-[26px] lg:translate-x-[30px]" : "translate-x-0"
        )}
      />
    </button>
  );
};

export default Toggle;
