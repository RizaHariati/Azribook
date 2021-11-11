import React from "react";
import { useGlobalContext } from "../../../context/appContext";
import moment from "moment";
const RightNotification = () => {
  const { commentForUser } = useGlobalContext();
  if (!commentForUser)
    return <div className="navright-submenu-container"></div>;
  else {
    return (
      <div className="navright-submenu-container">
        <div className="right-submenu-content">
          <div className="ri-sub-menu">
            <div className="ri-sub-menu-data">
              <h3>Earlier</h3>
              {commentForUser.map((comment, index) => {
                const { id, message, owner, publishDate } = comment;
                const { picture, firstName, lastName } = owner;
                const date = moment(publishDate).format("MMMM DD, YYYY");
                return (
                  <div className="ri-sub-menu-item" key={id}>
                    <img
                      src={picture}
                      alt={firstName}
                      className="ri-sub-menu-icon"
                    />

                    <div className="ri-sub-menu-text ">
                      <h4>
                        {`${firstName} ${lastName}`}
                        <span>
                          {index % 4 === 0
                            ? " liked your picture "
                            : ` commented on your picture ${message}`}
                        </span>
                      </h4>

                      <h5>{date}</h5>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default RightNotification;
