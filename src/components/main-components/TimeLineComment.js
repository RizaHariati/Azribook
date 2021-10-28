import React from "react";
import { useGlobalContext } from "../../context/appContext";
const TimeLineComment = () => {
  const { userProfile } = useGlobalContext();

  if (!userProfile) return <div className="timeline-comment"></div>;
  else {
    const { id, picture, firstName } = userProfile;
    return (
      <>
        <div className="timeline-comment timeline">
          <form className="posting-form">
            <button className="btn-image" id={id}>
              <img src={picture} alt={firstName} />
            </button>
            <input type="text" placeholder={`Write a public comment... `} />
          </form>
        </div>
      </>
    );
  }
};

export default TimeLineComment;
