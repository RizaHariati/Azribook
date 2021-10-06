import React from "react";
import { useMainContext } from "../../context/mainContext";

const MainMid = () => {
  const { allPosts, userProfile } = useMainContext();

  if (!allPosts || !userProfile) {
    return <h1 style={{ color: "white" }}>Loading</h1>;
  } else {
    const shufflePosts = allPosts.sort(() => 0.5 - Math.random());
    const storyPosts = shufflePosts.filter((post, index) => index < 4);
    console.log(allPosts);
    return (
      <div className="mid-container">
        <div className="story-container">
          <button
            className="story story-account"
            style={{
              background: `url(${userProfile.picture}) top/120% `,
            }}
          >
            <img
              src="/assets/images/icons/add.png"
              alt={userProfile.firstName}
            />
            <p>{`${userProfile.firstName} ${userProfile.lastName}`}</p>
          </button>
          {storyPosts.map((post) => {
            const { id, image, owner } = post;
            const { firstName, lastName } = owner;
            console.log(owner.picture);
            return (
              <button
                key={id}
                className="story"
                style={{ background: `url(${image}) center/cover no-repeat` }}
              >
                <img src={owner.picture} alt={firstName} />
                <p>{`${firstName} ${lastName}`}</p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
};

export default MainMid;
