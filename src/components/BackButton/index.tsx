import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const intl = useIntl();

  const clickBackHandler = () => {
    navigate(-1);
  };

  return (
    <button
      className="flex items-center text-gray-700 underline text-md font-light"
      aria-label={intl.formatMessage({ id: "BACK" })}
      onClick={clickBackHandler}
    >
      <ArrowLeftIcon
        className="w-3 h-3 mr-2"
        aria-label={intl.formatMessage({ id: "ARROW.LEFT" })}
      />
      <FormattedMessage id="BACK" />
    </button>
  );
};

export default BackButton;
