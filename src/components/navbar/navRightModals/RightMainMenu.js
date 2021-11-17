import React from "react";
import { useNavContext } from "../../../context/navContext";
import Footer from "../../Footer";
import LeftLinks from "../../main-components/Main/LeftLinks";
import LeftShortcuts from "../../main-components/Main/LeftShortcuts";

const RightMainMenu = () => {
  const { setSelectLinks } = useNavContext();
  return (
    <div className="submenu-main-menu">
      <LeftLinks setSelectLinks={setSelectLinks} />
      <LeftShortcuts setSelectLinks={setSelectLinks} />
      <Footer />
    </div>
  );
};

export default RightMainMenu;
