import React from "react";
import Footer from "../../Footer";
import LeftLinks from "./LeftLinks";
import LeftShortcuts from "./LeftShortcuts";

const MainLeft = () => {
  return (
    <div className="main-left">
      <LeftLinks />
      <LeftShortcuts />
      <Footer />
    </div>
  );
};

export default MainLeft;
