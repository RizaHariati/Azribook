import React from "react";

const Timeline = ({ user, timeline }) => {
  return (
    <div className="timeline-container">
      {timeline
        .filter((post, index) => index <= 7)
        .map((post) => {
          const { id, owner, publishDate } = post;

          return (
            <div key={id} className="timeline-content">
              <Posting owner={owner} publishDate={publishDate} />
              <Reaction />
              <Comment />
            </div>
          );
        })}
    </div>
  );
};

export default Timeline;

const Posting = ({ owner, publishDate }) => {
  const { id, firstName, lastName, picture } = owner;

  return (
    <div className="timeline-post timeline">
      <div className="tl-post-header">
        <button className="tl-btn" id={id}>
          <img src={picture} alt={firstName} />
        </button>
        <div className="tl-id">
          <h4>{`${firstName} ${lastName}`}</h4>
          <p>{publishDate}</p>
        </div>
        <button className="tl-more">
          <img src="/assets/images/icons/main/more.svg" alt="more" />
        </button>
      </div>
      <div className="tl-post-body">body</div>
      <div className="tl-post-icons">icons</div>
      <div className="line"></div>
    </div>
  );
};

const Reaction = () => {
  return (
    <div className="timeline-reaction timeline">
      <div className="line"></div>
    </div>
  );
};

const Comment = () => {
  return <div className="timeline-comment timeline">comment</div>;
};
