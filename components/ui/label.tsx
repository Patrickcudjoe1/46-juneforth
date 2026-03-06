import React from "react";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  children: React.ReactNode;
};

export const Label = ({ children, className = "", ...props }: LabelProps) => {
  return (
    <label {...props} className={`block text-sm font-medium ${className}`}>
      {children}
    </label>
  );
};

export default Label;
