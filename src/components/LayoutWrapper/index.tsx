import clsx from "clsx";
import React from "react";

interface IProps {
  className?: string;
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<IProps> = ({ className, children }) => {
  return (
    <div className={clsx("max-w-screen-2xl mx-5 2xl:mx-auto", className)}>
      {children}
    </div>
  );
};

export default LayoutWrapper;
