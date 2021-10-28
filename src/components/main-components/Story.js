import React from "react";
import { useGlobalContext } from "../../context/appContext";
const Story = ({ allPosts }) => {
  const shufflePosts = allPosts.sort(() => 0.5 - Math.random());
  const storyPosts = shufflePosts.filter((post, index) => index < 4);
  const { userProfile } = useGlobalContext();
  if (!userProfile) return <div className="story-container"></div>;
  else {
    return (
      <div className="story-container">
        <button
          className="story story-account"
          style={{
            background: `url(${userProfile.picture}) top/120% `,
          }}
        >
          <img src="/assets/images/icons/add.png" alt={userProfile.firstName} />
          <p>{`${userProfile.firstName} ${userProfile.lastName}`}</p>
        </button>
        {storyPosts.map((post) => {
          const { id, image, owner } = post;
          const { firstName, lastName } = owner;

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
    );
  }
};

export default Story;
