import React from "react";
import { useHistory, useLocation } from "react-router";
import { useNavContext } from "../../../context/navContext";
import { menuBtn_Menu, menuBtn_Create } from "../../../data/navRight-data";

const imgAddress = "/assets/images/icons/navright/menu/";
const imgAddress2 = "/assets/images/icons/navright/create/";
const RightMenu = () => {
  const history = useHistory();
  const location = useLocation();
  const { setSelectLinks } = useNavContext();
  const handleClick = (id) => {
    if (id === "soc-1") {
      history.push(`${location.pathname.substring(0, 30)}/pages`);
    } else if (id === "soc-2") {
      history.push(`/`);
    } else if (id === "shp-1") {
      history.push(`${location.pathname.substring(0, 30)}/*`);
    }
    setSelectLinks(null);
  };
  const handleClicks = () => {
    setSelectLinks(null);
  };
  return (
    <div className="navright-submenu-container menu">
      <h1>Menu</h1>
      <div className="right-submenu-content menu">
        <div className="ri-sub-menu">
          {menuBtn_Menu.map((menu) => {
            const { id, title, links } = menu;

            return (
              <div className="ri-sub-menu-data menu" key={id}>
                <h3>{title}</h3>
                {links.map((item) => {
                  const { index, link, text, icon } = item;

                  return (
                    <div
                      className={`ri-sub-menu-item ${index}`}
                      key={index}
                      id={index}
                      onClick={() => {
                        handleClick(index);
                      }}
                    >
                      <img
                        src={`${imgAddress}${icon}.svg`}
                        alt={text.substring(0)}
                      />
                      <div>
                        <h4>{link}</h4>
                        <p>{text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="ri-sub-menu">
          <h2>Create</h2>
          {menuBtn_Create.map((menu) => {
            const { id, links } = menu;

            return (
              <div
                className="ri-sub-menu-data menu"
                key={id}
                onClick={() => {
                  handleClicks();
                }}
              >
                {links.map((item) => {
                  const { index, name, icon } = item;
                  return (
                    <div className="ri-sub-menu-item" key={index}>
                      <div className="ri-sub-menu-icon">
                        <img src={`${imgAddress2}${icon}.svg`} alt={icon} />
                      </div>
                      <h4>{name}</h4>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RightMenu;
