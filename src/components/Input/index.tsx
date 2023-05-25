import React, { memo } from "react";
import clsx from "clsx";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  srLabel?: string;
  wrapperClassName?: string;
  inputWrapperClassName?: string;
  className?: string;
  RightIcon?: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
}

const Input: React.FC<IProps> = memo(
  ({
    srLabel,
    wrapperClassName,
    className,
    RightIcon,
    inputWrapperClassName,
    ...props
  }) => {
    return (
      <div className={wrapperClassName}>
        <label
          htmlFor={props.id}
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          {srLabel}
        </label>
        <div className={clsx("relative", inputWrapperClassName)}>
          {RightIcon ? (
            <div
              className={clsx(
                "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none",
                {
                  hidden: props.value,
                }
              )}
            >
              <RightIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
          ) : null}
          <input
            className={clsx(
              "block w-full p-2 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500",
              className
            )}
            {...props}
          />
        </div>
      </div>
    );
  }
);

export default Input;
