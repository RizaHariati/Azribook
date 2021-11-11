import React, { useState } from "react";
import { pagesData, mainShortcuts } from "../../data/main-data";
const imageAddress = "/assets/images/icons/pages/";
const imageAddress2 = "/assets/images/icons/main/";

const PagesLeft = () => {
  const [showPages, setShowPages] = useState(true);
  return (
    <div className="pages-left-container">
      <h2>Pages</h2>

      <div className="ri-sub-menu">
        <div className="ri-sub-menu-data">
          <div className="ri-sub-menu-item pages-item">
            <div
              className="ri-sub-menu-icon "
              style={{ background: "#c1436d" }}
            >
              <img src={`${imageAddress}yourpage.svg`} alt="yourpage" />
            </div>
            <h4>Your Pages</h4>
            <button
              className="pages-btn"
              onClick={() => setShowPages(!showPages)}
            >
              {showPages ? (
                <img src={`${imageAddress2}lessMenu.svg`} alt="yourpage" />
              ) : (
                <img src={`${imageAddress2}moreMenu.svg`} alt="yourpage" />
              )}
            </button>
          </div>

          {showPages &&
            mainShortcuts.map((shortcut) => {
              const { id, name, url, link } = shortcut;
              return (
                <a
                  href={link}
                  className="ri-sub-menu-item"
                  key={id}
                  style={{ cursor: "pointer" }}
                >
                  <div className="ri-sub-menu-icon">
                    <img src={`${imageAddress2 + url}.png`} alt={name} />
                  </div>
                  <h4>{name}</h4>
                </a>
              );
            })}
          <div className="page-create">
            <h4>+ Create New Page</h4>
          </div>
        </div>

        <div className="ri-sub-menu-data">
          {pagesData.map((item) => {
            const { index, name, icon } = item;
            return (
              <div className="ri-sub-menu-item" key={index}>
                <div className="ri-sub-menu-icon">
                  <img src={`${imageAddress + icon}.svg`} alt={name} />
                </div>
                <h4>{name}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PagesLeft;
