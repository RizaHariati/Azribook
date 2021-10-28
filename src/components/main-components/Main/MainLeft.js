import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../../context/appContext";
import { mainLeftLinks, mainShortcuts } from "../../../data/main-data";

const MainLeft = () => {
  return (
    <div className="main-left">
      <LeftLinks />
      <LeftShortcuts />
      <div className="main-left-footer">
        <p>copyright belongs to Facebook &#169; 2021</p>
        <p>mockup website by Riza Hariati for &hearts; AzriCoding &hearts;</p>
        <p>
          mockup data is from{" "}
          <a href="https://dummyapi.io/explorer">DUMMYAPI.IO</a>
        </p>
      </div>
    </div>
  );
};

export default MainLeft;

const LeftLinks = () => {
  const { userProfile } = useGlobalContext();
  const params = useParams().id;
  if (!userProfile) return <div className="main-left-links"></div>;

  const { firstName, lastName, picture } = userProfile;
  return (
    <div className="main-left-links">
      <Link to={`/main/${params}/account`} className="link-link-left">
        <div className="main-left-link ">
          <img src={picture} alt={firstName} className="account" />
          <p>{`${firstName} ${lastName}`}</p>
        </div>
      </Link>
      {mainLeftLinks.map((item) => {
        const { id, name, url, link } = item;
        return (
          <Link to={link} key={id} className="link-link-left">
            <div className="main-left-link">
              <img src={`/assets/images/icons/main/${url}.svg`} alt={name} />
              <p>{name}</p>
            </div>
          </Link>
        );
      })}
      <button to="/account" className="link-link-left">
        <div className="main-left-link ">
          <img
            src="/assets/images/icons/main/account.svg"
            alt="account"
            className="account"
          />
          <p>{`See more`}</p>
        </div>
      </button>
      <div className="line"></div>
    </div>
  );
};

const LeftShortcuts = () => {
  return (
    <div className="main-left-links">
      <div className="header">
        <h4>Your Shortcuts</h4>
        <button>Edit</button>
      </div>
      {mainShortcuts.map((item) => {
        const { id, name, url, link } = item;
        return (
          <a
            href={link}
            key={id}
            className="link-link-left"
            target="_blank"
            rel="noreferrer"
          >
            <div className="main-left-link">
              <img src={`/assets/images/icons/main/${url}.png`} alt={name} />
              <p>{name}</p>
            </div>
          </a>
        );
      })}

      <div className="line"></div>
    </div>
  );
};
