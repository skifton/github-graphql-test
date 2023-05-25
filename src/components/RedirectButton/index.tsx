import clsx from "clsx";
import React from "react";

interface IProps {
  url: string;
  className?: string;
  children: React.ReactNode;
}

const RedirectButton: React.FC<IProps> = ({ url, className, children }) => {
  return (
    <a
      className={clsx(
        "flex items-center text-center rounded-md border border-gray-800 px-2 hover:border-gray-400 hover:text-gray-400",
        className
      )}
      target="_blank"
      rel="noreferrer"
      href={url}
    >
      {children}
    </a>
  );
};

export default RedirectButton;
