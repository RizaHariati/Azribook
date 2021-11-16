import React from "react";
import Footer from "../../Footer";
import LeftLinks from "../../main-components/Main/LeftLinks";
import LeftShortcuts from "../../main-components/Main/LeftShortcuts";

const RightMainMenu = () => {
  return (
    <div className="submenu-main-menu">
      <LeftLinks />
      <LeftShortcuts />
      <Footer />
    </div>
  );
};

export default RightMainMenu;
