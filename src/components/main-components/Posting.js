import React from "react";
const Posting = ({ user }) => {
  const { id, firstName, picture } = user;
  return (
    <div className="posting-container">
      <div className="posting-content">
        <form className="posting-form">
          <button className="btn-image" id={id}>
            <img src={picture} alt={firstName} />
          </button>
          <input
            type="text"
            placeholder={`What's on your mind, ${firstName}? `}
          />
        </form>
        <div className="line"></div>
        <div className="posting-types">
          <button className="btn-post">
            <img
              src="/assets/images/icons/main/live-video.svg"
              alt="live video"
            />
            <p>Live video</p>
          </button>
          <button className="btn-post">
            <img src="/assets/images/icons/main/photo.svg" alt="photo" />
            <p>Photo/Video</p>
          </button>

          <button className="btn-post">
            <img src="/assets/images/icons/main/feeling.svg" alt="feeling" />
            <p>Feeling/Activity</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Posting;
