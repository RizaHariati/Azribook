import React, { useState, useEffect } from "react";
import Contact from "../Contact";
import { useParams } from "react-router";
import {
  mainSponsor,
  mainShortcuts,
  mainRightContacts,
} from "../../../data/main-data";
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
              <p>{link}</p>
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
            {/* <p>{text}</p> */}
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
  const [showText, setShowText] = useState(false);

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
        {/* ================These are buttons on headers=============== */}
        <div className="contacts-btn-container">
          {mainRightContacts.map((contact) => {
            const { id, url, text, name } = contact;

            return (
              <button
                key={id}
                id={id}
                className="contact-btn"
                onMouseEnter={() => setShowText(id)}
                onMouseLeave={() => setShowText(null)}
              >
                <img src={`/assets/images/icons/main/${url}.svg`} alt={name} />
                {showText === id && <p>{text}</p>}
              </button>
            );
          })}
        </div>
      </div>
      {filterUsers.map((data) => {
        const { id } = data;
        return <Contact key={id} data={data} />;
      })}
      <div className="line"></div>
    </div>
  );
};
