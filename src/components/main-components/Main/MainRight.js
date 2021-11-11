import React, { useState, useEffect } from "react";
import Contact from "../Contact";
import { useParams } from "react-router";
import { mainSponsor, mainShortcuts } from "../../../data/main-data";
import { useGlobalContext } from "../../../context/appContext";

const MainRight = () => {
  return (
    <div className="main-right">
      <Sponsored />
      <YourPages />
      <Contacts />
    </div>
  );
};

export default MainRight;

const Sponsored = () => {
  return (
    <div className="main-right-links">
      <div className="header">
        <h4>Sponsored</h4>
      </div>
      {mainSponsor.map((sponsor) => {
        const { id, link, name, url } = sponsor;

        return (
          <a
            href={link}
            className="main-right-link"
            key={id}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={`/assets/images/icons/main/${url}.png`}
              className="sponsored-image"
              alt={url}
            />
            <div className="text">
              <p>{name}</p>
              <h5>{link}</h5>
            </div>
          </a>
        );
      })}
      <div className="line"></div>
    </div>
  );
};

const YourPages = () => {
  const { id, name, url, link } = mainShortcuts[2];
  return (
    <div className="main-right-links">
      <div className="header">
        <h4>Your Pages</h4>
        <div className="contacts-btn-container">
          <button id="yourpage" className="contact-btn">
            <img src={`/assets/images/icons/main/more.svg`} alt="more" />
          </button>
        </div>
      </div>
      <a href={link} className="main-right-link">
        <img src={`/assets/images/icons/main/${url}.png`} alt={id} />
        <p>{name}</p>
      </a>
      <div className="line"></div>
    </div>
  );
};

const Contacts = () => {
  const { allUsers } = useGlobalContext();
  const [filterUsers, setfilterUsers] = useState(null);

  let params = useParams().id;

  useEffect(() => {
    if (allUsers) {
      let newFriendsList = allUsers.filter((data) => {
        return data.id !== params;
      });
      setfilterUsers(newFriendsList);
    }
  }, [allUsers, params]);
  if (!filterUsers) return <div className="main-right-links"></div>;
  return (
    <div className="main-right-links">
      <div className="header">
        <h4>Contacts</h4>
      </div>
      {filterUsers.map((data) => {
        const { id } = data;
        return <Contact key={id} data={data} />;
      })}
      <div className="line"></div>
    </div>
  );
};
