import React from "react";
import Loading from "../../components/Loading";
import { useMainContext } from "../../context/mainContext";
import MainMid from "./MainMid";
import SelectUser from "./SelectUser";
const Main = () => {
  const { baseData, userID, userProfile } = useMainContext();

  if (!baseData) {
    return (
      <div className="main-container">
        <Loading />
      </div>
    );
  } else if (baseData && userID === "0") {
    return (
      <div className="main-container">
        <SelectUser baseData={baseData} />
      </div>
    );
  } else {
    // console.log(userID);
    return (
      <div className="main-container">
        <div className="main-left">Main Left</div>

        <MainMid userProfile={userProfile} />

        <div className="main-right">Main right</div>
      </div>
    );
  }
};

export default Main;
