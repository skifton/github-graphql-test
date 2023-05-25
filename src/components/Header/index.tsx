import React from "react";
import LayoutWrapper from "../LayoutWrapper";

const Header: React.FC = () => {
  return (
    <header className="w-full h-20">
      <LayoutWrapper>
        <div className="flex mt-5">
          <img
            className="w-max h-20"
            src="https://48toolsstore.com/wp-content/uploads/2022/10/tkd-logo1.png"
            alt="LOGO"
          />
        </div>
      </LayoutWrapper>
    </header>
  );
};

export default Header;
