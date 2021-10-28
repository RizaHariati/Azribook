import React, { useState, useCallback, useEffect } from "react";
import useFetchAccount from "../../fetch/useFetchAccount";
import TimeLineReaction from "../main-components/TimeLineReaction";
import TimeLinePosting from "../main-components/TimeLinePosting";
import TimeLineComment from "../main-components/TimeLineComment";

const AccountTimeLine = ({ pickID }) => {
  const [userID, setUserID] = useState(null);
  const { loadingData, userPosts } = useFetchAccount(userID);

  const getUserID = useCallback(
    (id) => {
      setUserID(id);
    },
    [setUserID]
  );

  useEffect(() => {
    getUserID(pickID);
  }, [pickID, getUserID]);

  if (loadingData) {
    return <div>loading</div>;
  } else {
    if (userPosts === []) {
      return (
        <div className="timeline-container">
          <div className="timeline-content account-private">
            <h1>This Account's posts are private</h1>
          </div>
        </div>
      );
    } else {
      return (
        <div className="timeline-container  timeline-account">
          <div className="timeline-content">{loadingData && "loading..."}</div>
          {userPosts
            .sort(() => 0.5 - Math.random())
            .map((post, postIndex) => {
              const { id, owner } = post;
              if (userPosts.length === postIndex + 1) {
                return (
                  <div key={id} className="timeline-content">
                    <TimeLinePosting owner={owner} {...post} />
                    <TimeLineReaction />
                    <TimeLineComment />
                  </div>
                );
              } else {
                return (
                  <div key={id} className="timeline-content">
                    <TimeLinePosting owner={owner} {...post} />
                    <TimeLineReaction />
                    <TimeLineComment />
                  </div>
                );
              }
            })}
        </div>
      );
    }
  }
};
export default AccountTimeLine;
