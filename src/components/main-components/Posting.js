import React from "react";
import { useGlobalContext } from "../../context/appContext";
const Posting = () => {
  const { userProfile } = useGlobalContext();
  // if (!profile) return <div className="posting-container"></div>;

  if (!userProfile) return <div className="posting-container"></div>;
  else {
    const { id, firstName, picture } = userProfile;
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
          <div className="posting-btn-container">
            <button className="btn-post">
              <img
                src="/assets/images/icons/main/live-video.svg"
                alt="live video"
              />
              <p>Live video</p>
            </button>
            <button className="btn-post">
              <img src="/assets/images/icons/main/photo.svg" alt="photoicons" />
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
  }
};

export default Posting;
