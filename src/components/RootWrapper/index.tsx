import React from "react";
import Header from "../Header";
import { Outlet } from "react-router-dom";

const RootWrapper: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default RootWrapper;
