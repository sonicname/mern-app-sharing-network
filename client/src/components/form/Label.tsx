import React, { ReactNode } from "react";

interface ILabelProps {
  htmlFor: string;
  children: ReactNode;
}

const Label = ({ htmlFor, children }: ILabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className="absolute top-2/4 left-0 -translate-y-2/4 pl-4"
    >
      {children}
    </label>
  );
};

export default Label;
