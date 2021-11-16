import React from "react";
import { menuBtn_Create } from "../../../data/navRight-data";
const imgAddress2 = "/assets/images/icons/navright/create/";

const RightCreate = () => {
  return (
    <div className="navright-submenu-container ">
      <h1>Menu</h1>
      <div className="right-submenu-content ">
        <div className="ri-sub-menu">
          <h2>Create</h2>
          {menuBtn_Create.map((menu) => {
            const { id, links } = menu;

            return (
              <div className="ri-sub-menu-data " key={id}>
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

export default RightCreate;
