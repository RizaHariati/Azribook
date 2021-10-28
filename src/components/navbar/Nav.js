import React from "react";
import NavLeft from "./NavLeft";
import NavMid from "./NavMid";
import NavRight from "./NavRight";

const Nav = () => {
  return (
    <div className="navbar-container">
      <NavLeft />
      <NavMid />
      <NavRight />
    </div>
  );
};

export default Nav;
