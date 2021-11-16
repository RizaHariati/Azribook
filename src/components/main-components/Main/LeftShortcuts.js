import React from "react";
import { mainShortcuts } from "../../../data/main-data";
const LeftShortcuts = () => {
  return (
    <div className="main-left-links">
      <div className="header">
        <h4>Your Shortcuts</h4>
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
            style={{ cursor: "pointer" }}
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

export default LeftShortcuts;
