import React from "react";
import { useMainContext } from "../../context/mainContext";
import MainMid from "./MainMid";
import SelectUser from "./SelectUser";
const Home = () => {
  const { baseData, userID } = useMainContext();
  // console.log(userPosts);

  if (!baseData && userID === "0") {
    return (
      <div className="main-container">
        <div className="main-left">Main Left</div>

        <div className="main-mid">
          <h1 style={{ color: "white" }}>Loading</h1>
        </div>
        <div className="main-right">Main right</div>
      </div>
    );
  } else {
    return (
      <div className="main-container">
        {userID === "0" && <SelectUser baseData={baseData} />}
        {userID !== "0" && (
          <>
            <div className="main-left">Main Left</div>
            <div className="main-mid">
              <MainMid />
            </div>

            <div className="main-right">Main right</div>
          </>
        )}
      </div>
    );
  }
};

export default Home;
