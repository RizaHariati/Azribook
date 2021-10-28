import React from "react";
import moment from "moment";

const TimeLinePosting = ({ owner, publishDate, text, image, likes }) => {
  const { id, firstName, lastName, picture } = owner;
  const date = moment(publishDate).format("MMMM DD, YYYY");

  return (
    <div className="timeline-post timeline">
      <div className="tl-post-header">
        <button className="tl-btn" id={id}>
          <img src={picture} alt={firstName} />
        </button>
        <div className="tl-id">
          <h4>{`${firstName} ${lastName}`}</h4>
          <p>{date}</p>
        </div>
        <button className="tl-more">
          <img src="/assets/images/icons/main/more.svg" alt="more" />
        </button>
      </div>
      <div className="tl-post-body">
        <p>{text}</p>
        <img src={image} alt={text.substring(1)} />
      </div>
      <div className="tl-post-icons">
        <div className="tl-likes">
          <img src="/assets/images/icons/main/likes-icon.svg" alt="like" />
          <p> {likes}</p>
        </div>
        <p>comments</p>
      </div>

      <div className="line"></div>
    </div>
  );
};
export default TimeLinePosting;
