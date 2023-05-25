import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes";
import Repositories from "../views/Repositories";
import RepositoryDetails from "../views/RepositoryDetails";
import RootWrapper from "../components/RootWrapper";

const RouteWrapper: React.FC = () => {
  return (
    <Routes>
      <Route
        path={ROUTES.default}
        element={<Navigate to={ROUTES.repositories} />}
      />
      <Route path={ROUTES.default} element={<RootWrapper />}>
        <Route path={ROUTES.repositories} element={<Repositories />} />
        <Route path={ROUTES.repository} element={<RepositoryDetails />} />
      </Route>
    </Routes>
  );
};

export default RouteWrapper;
