import React from "react";
import MainLeft from "../Main/MainLeft";
import MainRight from "../Main/MainRight";
import MainMid from "../Main/MainMid";

const Main = () => {
  return (
    <div className="main-container">
      <MainLeft />
      <MainMid />
      <MainRight />
    </div>
  );
};

export default Main;
