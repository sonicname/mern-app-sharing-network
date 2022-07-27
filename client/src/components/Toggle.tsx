import classNames from "classnames";

interface IToggleProps {
  on: boolean;
  setOn: () => void;
}

const Toggle = ({ on, setOn }: IToggleProps) => {
  return (
    <button
      onClick={setOn}
      className={classNames(
        "relative inline-flex h-[34px] w-[70px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
        on ? "bg-primary" : "bg-gray-400"
      )}
    >
      <span
        className={classNames(
          "pointer-events-none inline-block h-[30px] w-[30px] transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out",
          on ? "translate-x-9" : "translate-x-0"
        )}
      />
    </button>
  );
};

export default Toggle;
