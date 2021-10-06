import React from "react";
import NavLeft from "./NavLeft";
import NavMid from "./NavMid";
import NavRight from "./NavRight";
import { useMainContext } from "../../context/mainContext";

const Nav = () => {
  const { baseData, userID, userProfile } = useMainContext();
  if (!baseData || userID === "0") {
    return (
      <div className="navbar-container">
        <NavLeft />
      </div>
    );
  }
  return (
    <div className="navbar-container">
      <NavLeft />
      <NavMid />
      {userProfile && <NavRight userProfile={userProfile} />}
    </div>
  );
};

export default Nav;
