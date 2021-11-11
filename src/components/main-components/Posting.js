import React, { useEffect } from "react";

import { useGlobalContext } from "../../context/appContext";
import axios from "axios";

const URL_POST = "https://dummyapi.io/data/v1/";
const header = { "app-id": "615d134132c9c40bf2a39437" };

const Posting = () => {
  const {
    userProfile,
    setshowTimelineModal,
    setTimelineModalID,
    newPost,
    setNewPost,
  } = useGlobalContext();

  const dataImage = () => {
    return axios({
      method: "get",
      url: `${URL_POST}tag/nature/post?`,
      headers: header,
      params: { limit: 20 },
    })
      .then((res) => {
        const data = res.data.data;
        const set = [...new Set(data.map((item) => item.image))];

        return set;
      })
      .catch((err) => console.log(err));
  };
  const handleclick = async (id) => {
    const number = Math.floor(Math.random() * 19 + 1);
    const data = await dataImage();

    setTimelineModalID({
      id: "create",
      data: { text: "", image: data[number], likes: 0, owner: { id } },
    });
    setshowTimelineModal("true");
  };

  // =======================functions on CRUD======================
  useEffect(() => {
    // other code
    if (!newPost) return;
    else {
      const postData = async () => {
        const { text, image, owner } = newPost;
        const id = owner.id;
        const number = Math.floor(Math.random() * 100 + 1);
        await axios({
          method: "POST",
          headers: header,
          url: `${URL_POST}post/create`,
          data: { text, image, likes: number, owner: id },
        })
          .then((res) => {
            console.log(res);
            setTimelineModalID({
              id: "create-success",
              data: { text: "" },
            });
            setshowTimelineModal(true);

            setTimeout(() => {
              setshowTimelineModal(false);
              setNewPost(null);
            }, 1000);
          })

          .catch((err) => {
            console.log(err);
          });
        window.location.reload();
      };
      postData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPost]);
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
              value=""
              placeholder={`What's on your mind, ${firstName}? `}
              onChange={(e) => e.preventDefault}
              onClick={() => {
                handleclick(id);
              }}
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
