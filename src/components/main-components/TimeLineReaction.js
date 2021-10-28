import React from "react";

const TimeLineReaction = () => {
  return (
    <div className="timeline-reaction timeline">
      <div className="posting-btn-container">
        <button className="btn-post">
          <img src="/assets/images/icons/main/like.svg" alt="Like" />
          <p>Like</p>
        </button>
        <button className="btn-post">
          <img src="/assets/images/icons/main/comment.svg" alt="Comment" />
          <p>Comment</p>
        </button>

        <button className="btn-post">
          <img src="/assets/images/icons/main/share.svg" alt="Share" />
          <p>Share</p>
        </button>
      </div>
      <div className="line"></div>
    </div>
  );
};

export default TimeLineReaction;
