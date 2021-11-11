import React from "react";
import { mainShortcuts } from "../../data/main-data";
const imageAddress = "/assets/images/icons/pages/";
const imageAddress2 = "/assets/images/icons/main/";

const PagesRight = () => {
  return (
    <div className="pages-right-container">
      {mainShortcuts.map((shortcut) => {
        const { id, name, url, link } = shortcut;
        return (
          <a
            href={link}
            className="pages-right-item"
            key={id}
            style={{ cursor: "pointer" }}
          >
            <div className="pages-icon">
              <img src={`${imageAddress2 + url}.png`} alt={name} />
            </div>
            <h3>{name}</h3>
            <div className="pages-btn-container">
              <div className="pages-notification">
                <img src={`${imageAddress}notifications.svg`} alt="yourpage" />
                <p>Notifications</p>
              </div>
              <div className="pages-notification">
                <img src={`${imageAddress}messages.svg`} alt="yourpage" />
                <p>Mesages</p>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default PagesRight;
