import React, { useState } from "react";
import { useGlobalContext } from "../../context/appContext";
import { accountSubmenu } from "../../data/account-data";
const imageAddress = "/assets/images/account-image/";

const AccountSubmenu = ({ showHeader }) => {
  const { userProfile } = useGlobalContext();
  const [activeButton, setActiveButton] = useState(accountSubmenu[0].id);
  const handleClick = (id) => {
    if (id === activeButton) {
      setActiveButton(null);
    } else {
      setActiveButton(id);
    }
  };
  if (!userProfile) return <div></div>;
  return (
    <div
      className={
        showHeader
          ? "account-submenu-container fixed"
          : "account-submenu-container"
      }
    >
      <div className="account-submenu">
        <div className="account-submenu-left">
          {!showHeader && (
            <div className="account-submenu-links">
              {accountSubmenu.map((menu) => {
                const { id, name } = menu;
                return (
                  <button
                    key={id}
                    className={
                      activeButton === id
                        ? "account-sub-btn active"
                        : "account-sub-btn"
                    }
                    onClick={() => handleClick(id)}
                  >
                    <p> {name}</p>
                  </button>
                );
              })}
              <button
                className="account-sub-btn-more"
                onClick={() => handleClick("link-6")}
              >
                <img src={`${imageAddress}more.svg`} alt="more" />
                <p>more</p>
              </button>
            </div>
          )}

          {showHeader && (
            <div className="account-submenu-profile">
              {userProfile && (
                <button className="account-sub-btn profile">
                  <img src={`${userProfile.picture}`} alt="more" />
                  <p>{`${userProfile.firstName} ${userProfile.lastName}`}</p>
                </button>
              )}
            </div>
          )}
        </div>

        <div className="account-submenu-right">
          <button className="account-btn account-right-btn accent">
            <img src={`${imageAddress}more.svg`} alt="more" />
            <p>Add to Story</p>
          </button>
          <button className="account-btn account-right-btn">
            <img src={`${imageAddress}more.svg`} alt="more" />
            <p>Edit Profile</p>
          </button>
          <button className="account-btn account-right-btn">
            <img src={`${imageAddress}more.svg`} alt="more" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default AccountSubmenu;
