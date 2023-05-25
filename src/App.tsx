import React from "react";
import RouteWrapper from "./routes/RouteWrapper";
import LanguageProvider from "./providers/LanguageProvider";

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <RouteWrapper />
    </LanguageProvider>
  );
};

export default App;
