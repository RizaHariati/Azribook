import axios from "axios";
import React, { useState } from "react";
import { useGlobalContext } from "../../context/appContext";
const URL_POST = "https://dummyapi.io/data/v1/";
const header = { "app-id": "615d134132c9c40bf2a39437" };

const TimeLineComment = ({ commentList, setCommentList, id }) => {
  const { userProfile } = useGlobalContext();
  const [text, setText] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    if (!userProfile) return;
    console.log(id);
    e.preventDefault();
    await axios({
      method: "POST",
      headers: header,
      url: `${URL_POST}comment/create`,
      data: {
        message: text,
        owner: userProfile.id,
        post: id,
      },
    })
      .then((res) => {
        console.log(res);
        const data = res.data;
        setCommentList((prev) => {
          return [data, ...prev];
        });
        setText("");
      })
      .catch((err) => console.log(err));
  };
  if (!userProfile) return <div className="timeline-comment"></div>;
  else {
    const { id, picture, firstName } = userProfile;
    return (
      <div className="timeline">
        <div className="timeline-comment ">
          <form className="posting-form" onSubmit={handleSubmit}>
            <button className="btn-image" id={id}>
              <img src={picture} alt={firstName} />
            </button>
            <input
              type="text"
              placeholder={`Write a public comment... `}
              value={text}
              onChange={(e) => handleChange(e)}
            />
          </form>

          {commentList.length > 0 &&
            commentList.map((comment) => {
              const { id, message, owner } = comment;

              return (
                <div className="posting-form" key={id}>
                  <div className="btn-image">
                    <img src={owner.picture} alt={owner.firstName} />
                  </div>
                  <div className="comment-text">
                    <h4>{`${owner.firstName} ${owner.lastName}`}</h4>
                    <p>{message}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
};

export default TimeLineComment;
