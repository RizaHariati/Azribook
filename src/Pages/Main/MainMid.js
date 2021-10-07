import React from "react";
import Loading from "../../components/Loading";
import Posting from "../../components/main-components/Posting";
import Story from "../../components/main-components/Story";
import Timeline from "../../components/main-components/Timeline";
import { useMainContext } from "../../context/mainContext";

const MainMid = () => {
  const { allPosts, userProfile } = useMainContext();

  if (!allPosts || !userProfile) {
    return (
      <div className="main-mid">
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="main-mid">
        <Story />
        <Posting user={userProfile} />
        <Timeline user={userProfile} timeline={allPosts} />
      </div>
    );
  }
};

export default MainMid;
