import React from "react";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { menuBtn_Account } from "../../../data/navRight-data";
import { useGlobalContext } from "../../../context/appContext";
import Footer from "../../Footer";
import { useNavContext } from "../../../context/navContext";
const imgAddress = "/assets/images/icons/navright/account/";

const RightAccount = () => {
  const { userProfile } = useGlobalContext();
  const { setSelectLinks } = useNavContext();
  const history = useHistory();
  const location = useLocation().pathname.substring(0, 30);

  const handleClick = () => {
    history.push("/");
    setSelectLinks(null);
  };
  const handleClicks = () => {
    setSelectLinks(null);
  };

  if (!userProfile) return <div className="navright-submenu-container"></div>;
  else {
    return (
      <div className="navright-submenu-container">
        <div className="right-submenu-content">
          <div className="ri-sub-menu">
            <div className="ri-sub-menu-data">
              <Link
                to={`${location}/account`}
                className="ri-sub-link"
                onClick={() => handleClicks()}
              >
                <div className="ri-sub-menu-item account">
                  <img src={userProfile.picture} alt={userProfile.firstName} />
                  <div>
                    <h4>{`${userProfile.firstName} ${userProfile.lastName}`}</h4>
                    <p>See your profile</p>
                  </div>
                </div>
              </Link>
            </div>
            {menuBtn_Account.map((menu) => {
              const { id, links } = menu;
              return (
                <div
                  className="ri-sub-menu-data menu"
                  key={id}
                  onClick={() => handleClicks()}
                >
                  {links.map((item) => {
                    const { index, name, icon } = item;
                    return (
                      <div className="ri-sub-menu-item" key={index}>
                        <div className="ri-sub-menu-icon">
                          <img src={`${imgAddress}${icon}.svg`} alt={icon} />
                        </div>
                        <h4>{name}</h4>
                      </div>
                    );
                  })}
                </div>
              );
            })}
            <div className="ri-sub-menu-data menu">
              <div
                className="ri-sub-menu-item"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleClick();
                }}
              >
                <div className="ri-sub-menu-icon">
                  <img src={`${imgAddress}logout.svg`} alt="logout" />
                </div>
                <h4>Log out</h4>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
};

export default RightAccount;
