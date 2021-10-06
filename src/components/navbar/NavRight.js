import React, { useState } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../../data/navbar-data";
const NavRight = ({ userProfile }) => {
  const [selectLinks, setSelectLinks] = useState(null);
  const { firstName, picture } = userProfile;
  const handleLinks = (e) => {
    const id = e.currentTarget.id;

    if (selectLinks === "id") {
      setSelectLinks(null);
    } else {
      setSelectLinks(id);
    }
  };
  return (
    <div className="nav-right">
      <div className="create links">create</div>
      <div className="profile links">
        <Link to="/account">
          <button className="link" id="link-3">
            <img src={picture} alt={firstName} />
            <p>{firstName}</p>
          </button>
        </Link>
      </div>
      <div className="menu links">
        <button className="link" id="link-4" onClick={handleLinks}>
          <img
            src={
              selectLinks === "link-4"
                ? `/assets/images/icons/navbar/menu-hover.svg`
                : `/assets/images/icons/navbar/menu.svg`
            }
            alt="menu"
          />
        </button>
      </div>

      {navLinks.map((link) => {
        const { id, name, url, hover } = link;
        return (
          <div key={id} className="links">
            <button className="link" id={id} onClick={handleLinks}>
              <img
                src={
                  selectLinks === id
                    ? `/assets/images/icons/navbar/${hover}.svg`
                    : `/assets/images/icons/navbar/${url}.svg`
                }
                alt={name}
              />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default NavRight;
