import React, { useState } from "react";
import { useParams } from "react-router";
import { useNavContext } from "../../context/navContext";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/appContext";
import RightMenu from "./navRightModals/RightMenu";
import RightNotification from "./navRightModals/RightNotification";
import RightAccount from "./navRightModals/RightAccount";
import RightMainMenu from "./navRightModals/RightMainMenu";
import RightCreate from "./navRightModals/RightCreate";

const NavRight = () => {
  const { userProfile } = useGlobalContext();
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

      <NavBtn
        props={{
          id: "other-6",
          name: "more",
          url: "more",
          hover: "more-hover",
        }}
        handleLinks={handleLinks}
        selectLinks={selectLinks}
      />
      <NavBtn
        props={{
          id: "link-5",
          name: "create",
          url: "create",
          hover: "create-hover",
        }}
        handleLinks={handleLinks}
        selectLinks={selectLinks}
      />
      <NavBtn
        props={{
          id: "link-4",
          name: "menu",
          url: "menu",
          hover: "menu-hover",
        }}
        handleLinks={handleLinks}
        selectLinks={selectLinks}
      />

      <NavBtn
        props={{
          id: "link-2",
          name: "notification",
          url: "notification",
          hover: "notification-hover",
        }}
        handleLinks={handleLinks}
        selectLinks={selectLinks}
      />

      <NavBtn
        props={{
          id: "link-3",
          name: "account",
          url: "account",
          hover: "account-hover",
        }}
        handleLinks={handleLinks}
        selectLinks={selectLinks}
      />

      {selectLinks === "link-2" && <RightNotification />}
      {selectLinks === "link-3" && <RightAccount />}
      {selectLinks === "link-4" && <RightMenu />}
      {selectLinks === "link-5" && <RightCreate />}
      {selectLinks === "other-6" && <RightMainMenu />}
    </div>
  );
};

export default NavRight;

const NavBtn = ({ props, handleLinks, selectLinks }) => {
  const { handleMouse, mouseOver, setMouseOver } = useNavContext();
  const { id, name, url, hover } = props;

  return (
    <div className={`${name} links`}>
      <button
        className="link"
        id={id}
        onClick={handleLinks}
        onMouseEnter={handleMouse}
        onMouseLeave={() => setMouseOver(null)}
      >
        <img
          src={
            selectLinks === { id }
              ? `/assets/images/icons/navbar/${hover}.svg`
              : `/assets/images/icons/navbar/${url}.svg`
          }
          alt="menu"
        />
        {mouseOver === id && <p>{name}</p>}
      </button>
    </div>
  );
};
