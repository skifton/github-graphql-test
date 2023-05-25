import React from "react";
import { IntlProvider } from "react-intl";

import enMessages from "../i18n/en.json";

interface IProps {
  children: React.ReactNode;
}
const LanguageProvider: React.FC<IProps> = ({ children }) => {
  const messages = enMessages;

  return (
    <IntlProvider locale="en" messages={messages}>
      {children}
    </IntlProvider>
  );
};

export default LanguageProvider;
