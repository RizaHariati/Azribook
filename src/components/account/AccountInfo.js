import React, { useState, memo, useEffect, useRef } from "react";
import { useGlobalContext } from "../../context/appContext";
import Footer from "../Footer";
const imageAddress = "/assets/images/account-image/";
const defaultImage = "/assets/images/account-image/cover.jpg";

const AccountInfo = () => {
  const { guestPosts } = useGlobalContext();
  const refInfo = useRef(null);

  if (!guestPosts) return <div></div>;
  else {
    return (
      <div className="account-info" ref={refInfo}>
        <div className="account-info-setting">
          <Header guestPosts={guestPosts} />
          <Friends />
          <Photos guestPosts={guestPosts} />

          <Footer />
        </div>
      </div>
    );
  }
};

export default AccountInfo;

const Header = memo(({ guestPosts }) => {
  return (
    <div className="account-info-list">
      <div className="account-list-header">
        <h3>Intro</h3>
        {/* <Link to="/error"> edit</Link> */}
      </div>
      <div className="account-list-links">
        <img src={`${imageAddress}feed.svg`} alt="feed" />
        <p>Followed by 272 people</p>
      </div>
      <div className="account-list-links">
        <img src={`${imageAddress}globe.svg`} alt="globe" />
        <a href="/#">my website</a>
      </div>
      <div className="account-list-links">
        <img src={`${imageAddress}globe.svg`} alt="globe" />
        <a href="/#">link1.link.a</a>
      </div>
      <button className="account-btn">Edit details</button>
      <button className="account-btn">Add Hobbies</button>
      <div className="account-list-images header">
        {guestPosts
          .filter((item, index) => index < 3)
          .map((item, index) => {
            const { image } = item;
            return (
              <img
                key={index}
                src={image}
                alt={`feature${index}`}
                className="row-1"
              />
            );
          })}
      </div>
      <button className="account-btn">Edit Featured</button>
    </div>
  );
});

const Friends = () => {
  const [friends, setFriends] = useState(null);
  const { allUsers } = useGlobalContext();

  useEffect(() => {
    if (allUsers) {
      const shuffle = allUsers
        .sort(() => 0.5 - Math.random())
        .filter((item, id) => id < 6);
      return setFriends(shuffle);
    }
  }, [allUsers]);
  if (!friends) return <div></div>;
  else {
    return (
      <div className="account-info-list">
        <div className="account-list-header">
          <h3>Friends</h3>
          {/* <Link to="/error">See All Friends</Link> */}
        </div>
        <div className="account-list-images ">
          {friends.map((friend, index) => {
            const { picture, firstName } = friend;
            return (
              <div key={index}>
                <img
                  key={index}
                  src={picture}
                  alt={`friend-${index}`}
                  className="row-2"
                />
                <p>{firstName}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

const Photos = memo(({ guestPosts }) => {
  return (
    <div className="account-info-list">
      <div className="account-list-header">
        <h3>Photos</h3>
        {/* <Link to="/error">See All Photos</Link> */}
      </div>
      <div className="account-list-images ">
        {guestPosts.map((photo, index) => {
          const { image, text } = photo;

          return (
            <div key={index}>
              <img
                key={index}
                src={image || defaultImage}
                alt={`photos-${index}`}
                className="row-2"
              />
              <p>{text.substring(0, 5)}...</p>
            </div>
          );
        })}
      </div>
    </div>
  );
});
