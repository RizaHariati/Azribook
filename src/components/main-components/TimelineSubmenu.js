import React from "react";
import { useGlobalContext } from "../../context/appContext";
const imageAddress = "/assets/images/icons/timeline/";

const TimelineSubmenu = ({ props }) => {
  const { setTimelineModalID } = useGlobalContext();
  return (
    <div className="tl-del-container">
      <button
        className="tl-del-btn"
        id="hide"
        onClick={(e) =>
          setTimelineModalID({ id: e.currentTarget.id, data: props })
        }
      >
        <img src={`${imageAddress}hide.svg`} alt="hide" />
        <div className="info">
          <h4>Hide Post</h4>
          <p>See fewer posts like this</p>
        </div>
      </button>

      <button
        className="tl-del-btn"
        id="unfollow"
        onClick={(e) =>
          setTimelineModalID({ id: e.currentTarget.id, data: props })
        }
      >
        <img src={`${imageAddress}unfollow.svg`} alt="unfollow" />
        <div className="info">
          <h4>unfollow {props.owner.firstName}</h4>
          <p>stop seeing posts but stay friends</p>
        </div>
      </button>
    </div>
  );
};

export default TimelineSubmenu;
