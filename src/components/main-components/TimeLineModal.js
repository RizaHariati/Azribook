import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/appContext";
import { timelineModal } from "../../data/timeline-data";

const imageAddress = "/assets/images/icons/timeline/";

const TimeLineModal = () => {
  const {
    setshowTimelineModal,
    timelineModalID,
    userProfile,
    setEditedText,
    setNewPost,
  } = useGlobalContext();

  const [editText, seteditText] = useState(timelineModalID.data.text);
  const [newText, setNewText] = useState(timelineModalID.data.text);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (timelineModalID === { id: "", data: { text: "" } }) return;
    else {
      const id = timelineModalID.id;
      const takeData = timelineModal.find((modal) => modal.id === id);
      return setData(takeData);
    }
  }, [timelineModalID]);

  const submitNewPost = (e) => {
    e.preventDefault();
    if (newText !== "") {
      const { image, likes, owner } = timelineModalID.data;
      const data = { text: newText, image, likes, owner };
      setNewPost(data);
    }
    e.currentTarget.value = "";
    setNewText("");
    setshowTimelineModal(false);
  };

  const submitEdit = (e) => {
    e.preventDefault();
    timelineModalID.data.text = editText;
    const data = timelineModalID.data;
    setEditedText({
      postID: timelineModalID.data.id,
      methodID: "edit-get",
      data,
    });
    setshowTimelineModal(false);
  };

  if (!data) return <div className="tl-modal-container"></div>;
  if (data.id === "create") {
    return (
      <div className="tl-modal-container">
        <div className="tl-modal-content">
          <h2>Create Post</h2>
          {userProfile && (
            <div className="tl-modal-userInformation">
              <img src={userProfile.picture} alt={userProfile.firstName} />
              <h4>{`${userProfile.firstName} ${userProfile.lastName}`}</h4>
            </div>
          )}

          <form className="tl-modal-form" onSubmit={(e) => submitNewPost(e)}>
            <input
              type="text"
              value={newText}
              onChange={(e) => {
                e.preventDefault();
                setNewText(e.target.value);
              }}
              className="tl-modal-input"
              placeholder={`What's on your mind?`}
            />
            <button
              type="button"
              className="tl-modal-btn"
              onClick={() => setshowTimelineModal(false)}
            >
              cancel
            </button>
            <button type="submit" className="tl-modal-btn">
              save
            </button>
          </form>
        </div>
      </div>
    );
  }
  if (data.id === "edit-send") {
    return (
      <div className="tl-modal-container">
        <div className="tl-modal-content">
          <h2>Edit Post</h2>
          {userProfile && (
            <div className="tl-modal-userInformation">
              <img src={userProfile.picture} alt={userProfile.firstName} />
              <h4>{`${userProfile.firstName} ${userProfile.lastName}`}</h4>
            </div>
          )}
          {timelineModalID && (
            <form className="tl-modal-form" onSubmit={submitEdit}>
              <input
                type="text"
                value={editText}
                onChange={(e) => {
                  e.preventDefault();
                  seteditText(e.target.value);
                }}
                className="tl-modal-input"
              />
              <img
                src={timelineModalID.data.image}
                alt={timelineModalID.data.id}
                className="tl-modal-image"
              />
              <button
                type="button"
                className="tl-modal-btn"
                onClick={() => setshowTimelineModal(false)}
              >
                cancel
              </button>
              <button type="submit" className="tl-modal-btn">
                save
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="tl-modal-container">
      {data && (
        <div className="tl-modal-content">
          <div className="tl-modal-data">
            <img src={`${imageAddress}${data.icon}.svg`} alt={data.id} />
            <div className="tl-modal-info">
              <h3>{data.title}</h3>
              <h4>{data.text}</h4>
            </div>
          </div>
          <button
            className="tl-modal-btn"
            onClick={() => setshowTimelineModal(false)}
          >
            close
          </button>
        </div>
      )}
    </div>
  );
};

export default TimeLineModal;
