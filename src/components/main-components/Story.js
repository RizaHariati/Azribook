import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/appContext";
import axios from "axios";

const URL_ALLPOST = "https://dummyapi.io/data/v1/post?";
const header = { "app-id": "615d134132c9c40bf2a39437" };

const Story = () => {
  const [story, setStory] = useState([]);

  useEffect(() => {
    const config = {
      method: "GET",
      url: URL_ALLPOST,
      headers: header,
      params: { limit: 15 },
    };

    let cancel = "don't cancel";
    if (!cancel) return;
    const fetchData = async () =>
      await axios(config)
        .then((res) => {
          const response = res.data.data.sort(() => 0.5 - Math.random());
          const storyPosts = response.filter((post, index) => index > 10);

          setStory(storyPosts);
        })
        .catch((err) => {
          if (axios.isAxiosError) {
            console.log(err);
          }
        });
    fetchData();
    return () => {
      cancel = "cancel";
    };
  }, []);

  const { userProfile } = useGlobalContext();
  if (!userProfile) return <div className="story-container"></div>;
  else {
    return (
      <div className="story-container">
        <div className="story">
          <img
            src={userProfile.picture}
            alt={userProfile.firstName}
            className="story-background user"
          />
          <img
            src="/assets/images/icons/add.png"
            alt={userProfile.firstName}
            className="story-owner user"
          />
          <p>create story</p>
        </div>
        {story.map((post) => {
          const { id, image, owner } = post;
          const { firstName, lastName } = owner;

          return (
            <div key={id} className="story">
              <img src={image} alt={id} className="story-background" />
              <img
                src={owner.picture}
                alt={firstName}
                className="story-owner"
              />
              <p>{`${firstName} ${lastName}`}</p>
            </div>
          );
        })}
      </div>
    );
  }
};

export default Story;
