import React, { useState } from "react";
import { useParams } from "react-router";
import { navLinks } from "../../data/navbar-data";
import { useNavContext } from "../../context/navContext";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/appContext";
import RightMenu from "./navRightModals/RightMenu";
import RightNotification from "./navRightModals/RightNotification";
import RightAccount from "./navRightModals/RightAccount";

const NavRight = () => {
  const { userProfile } = useGlobalContext();
  const { handleMouse, mouseOver, setMouseOver } = useNavContext();
  const [selectLinks, setSelectLinks] = useState(null);

  const params = useParams().id;

  const handleLinks = (e) => {
    const id = e.currentTarget.id;
    if (selectLinks === id) {
      setSelectLinks(null);
    } else {
      setSelectLinks(id);
    }
  };

  if (!userProfile) return <div></div>;

  return (
    <div className="nav-right">
      <div className="profile links">
        <Link to={`/main/${params}/account`}>
          <button className="link" id="link-3">
            <img src={userProfile.picture} alt={userProfile.firstName} />
            <h4>{userProfile.firstName}</h4>
          </button>
        </Link>
      </div>

      <div className="create links">
        <button
          className="link"
          id="link-5"
          onClick={handleLinks}
          onMouseEnter={() => handleMouse}
          onMouseLeave={() => setMouseOver(null)}
        >
          <img
            src={
              selectLinks === "link-5"
                ? `/assets/images/icons/navbar/create-hover.svg`
                : `/assets/images/icons/navbar/create.svg`
            }
            alt="menu"
          />
          {mouseOver === "link-5" && <p>create</p>}
        </button>
      </div>

      <div className="menu links">
        <button
          className="link"
          id="link-4"
          onClick={handleLinks}
          onMouseEnter={handleMouse}
          onMouseLeave={() => setMouseOver(null)}
        >
          <img
            src={
              selectLinks === "link-4"
                ? `/assets/images/icons/navbar/menu-hover.svg`
                : `/assets/images/icons/navbar/menu.svg`
            }
            alt="menu"
          />
          {mouseOver === "link-4" && <p>menu</p>}
        </button>
      </div>

      {navLinks.map((link) => {
        const { id, name, url, hover } = link;
        return (
          <div key={id} className="links">
            <button
              className="link"
              id={id}
              onClick={handleLinks}
              onMouseEnter={handleMouse}
              onMouseLeave={() => setMouseOver(null)}
            >
              <img
                src={
                  selectLinks === id
                    ? `/assets/images/icons/navbar/${hover}.svg`
                    : `/assets/images/icons/navbar/${url}.svg`
                }
                alt={name}
              />
              {mouseOver === id && <p>{name}</p>}
            </button>
          </div>
        );
      })}

      {selectLinks === "link-2" && <RightNotification />}
      {selectLinks === "link-3" && <RightAccount />}
      {selectLinks === "link-4" && <RightMenu />}
    </div>
  );
};

export default NavRight;
