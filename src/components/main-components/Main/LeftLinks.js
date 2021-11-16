import React, { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../../context/appContext";
import { menuBtn_Menu } from "../../../data/navRight-data";

const imageAddress = "/assets/images/icons/navright/menu/";
const menu = [...new Set([...menuBtn_Menu.map((item) => item.links)])];
const menuA = menu[0].flat();
const menuB = menu.filter((item, index) => index > 0).flat();

const LeftLinks = () => {
  const { userProfile } = useGlobalContext();
  const [showMore, setshowMore] = useState(false);
  const params = useParams().id;
  if (!userProfile) return <div className="main-left-links"></div>;

  const { firstName, lastName, picture } = userProfile;
  return (
    <div className="main-left-links">
      <Link
        to={`/main/${params}/account`}
        className="link-link-left"
        style={{ cursor: "pointer" }}
      >
        <div className="main-left-link ">
          <img src={picture} alt={firstName} className="account" />
          <h4>{`${firstName} ${lastName}`}</h4>
        </div>
      </Link>
      {menuA.map((item) => {
        const { index, link, icon } = item;
        return (
          <div to={link} key={index} className="link-link-left">
            <div className="main-left-link">
              <img src={`${imageAddress}${icon}.svg`} alt={link} />
              <p>{link}</p>
            </div>
          </div>
        );
      })}
      {showMore &&
        menuB.map((item) => {
          const { index, link, icon } = item;
          return (
            <div to={link} key={index} className="link-link-left">
              <div className="main-left-link">
                <img src={`${imageAddress}${icon}.svg`} alt={link} />
                <p>{link}</p>
              </div>
            </div>
          );
        })}
      <button className="link-link-left" onClick={() => setshowMore(!showMore)}>
        {showMore ? (
          <div className="link-left-more">
            <img
              src="/assets/images/icons/main/lessMenu.svg"
              alt="account"
              className="account"
            />
            <p>See less</p>
          </div>
        ) : (
          <div className="link-left-more">
            <img
              src="/assets/images/icons/main/moreMenu.svg"
              alt="account"
              className="account"
            />
            <p>See more</p>
          </div>
        )}
      </button>
      <div className="line"></div>
    </div>
  );
};
export default LeftLinks;