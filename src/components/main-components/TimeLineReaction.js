import React, { useState } from "react";
import axios from "axios";
const header = { "app-id": "615d134132c9c40bf2a39437" };
const TimeLineReaction = ({
  setTotalLikes,
  setShowComment,
  id,
  setCommentList,
}) => {
  const [disableButton, setDisableButton] = useState(false);

  const getComents = () => {
    setShowComment(true);
    axios
      .get(`https://dummyapi.io/data/v1/post/${id}/comment?limit=3`, {
        headers: header,
      })
      .then((res) => {
        console.log(res);
        setCommentList(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="timeline-reaction timeline">
      <div className="posting-btn-container">
        <button
          className="tl-reaction-btn"
          disabled={disableButton}
          onClick={() => {
            setTotalLikes((prevLikes) => prevLikes + 1);
            setDisableButton(true);
          }}
        >
          <img src="/assets/images/icons/main/like.svg" alt="Like" />
          <p>Like</p>
        </button>

        <button className="tl-reaction-btn" onClick={getComents}>
          <img src="/assets/images/icons/main/comment.svg" alt="Comment" />
          <p>Comment</p>
        </button>

        <button className="tl-reaction-btn" style={{ cursor: "none" }}>
          <img src="/assets/images/icons/main/share.svg" alt="Share" />
          <p>Share</p>
        </button>
      </div>
      <div className="line"></div>
    </div>
  );
};

export default TimeLineReaction;
