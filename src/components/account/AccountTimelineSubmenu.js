import React from "react";
import { useGlobalContext } from "../../context/appContext";
const imageAddress = "/assets/images/icons/timeline/";

const AccountTimelineSubmenu = ({ props }) => {
  const { setTimelineModalID } = useGlobalContext();

  return (
    <div className="tl-del-container">
      <button
        className="tl-del-btn"
        id="edit-send"
        onClick={(e) =>
          setTimelineModalID({ id: e.currentTarget.id, data: props })
        }
      >
        <img src={`${imageAddress}edit.svg`} alt="edit" />
        <div className="info">
          <h4>Edit Post</h4>
        </div>
      </button>

      <button
        className="tl-del-btn"
        id="delete"
        onClick={(e) =>
          setTimelineModalID({ id: e.currentTarget.id, data: props })
        }
      >
        <img src={`${imageAddress}trash.svg`} alt="trash" />
        <div className="info">
          <h4>Move to recycle bin</h4>
          <p>Items in your recycle bin will be deleted after 30 days</p>
        </div>
      </button>
    </div>
  );
};

export default AccountTimelineSubmenu;
