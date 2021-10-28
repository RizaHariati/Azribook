import React, { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const Contact = ({ data }) => {
  const [guestID, setGuestID] = useState("60d0fe4f5311236168a109ca");
  const [position, setPosition] = useState({ x: "0", y: "0" });

  const params = useParams().id;

  const checkPosition = (e, id) => {
    e.preventDefault();
    setGuestID(id);
    let location = e.currentTarget.getBoundingClientRect();

    setPosition({ x: location.x, y: location.y });
  };
  if (!data) return <div></div>;
  else {
    const { id, firstName, lastName, picture } = data;
    return (
      <Link to={`/main/${params}/guest/${id}`} className="link-link-right">
        <button
          className="main-right-link"
          onMouseEnter={(e) => checkPosition(e, id)}
          onMouseLeave={() => setPosition({ x: "0", y: "0" })}
        >
          <img src={picture} alt="account" />
          <p>{`${firstName} ${lastName}`}</p>
          {guestID && (
            <Modal guestID={guestID} position={position} data={data} />
          )}
        </button>
      </Link>
    );
  }
};

export default Contact;

const Modal = ({ position, data }) => {
  const { id, title, firstName, lastName, picture } = data;

  return (
    <div
      className="contact-detail"
      style={
        position.y > document.body.clientHeight
          ? { left: `${position.x}px`, top: document.body.clientHeight - 50 }
          : { left: `${position.x}px`, top: `${position.y}px` }
      }
    >
      <img src={picture} alt={firstName} />
      <div className="contact-infos">
        <h2>{`${firstName} ${lastName}`}</h2>
        <div className="contact-info">
          {title === "ms" || title === "mrs" || title === "miss" ? (
            <img src={`/assets/images/icons/main/female.svg`} alt={firstName} />
          ) : (
            <img src={`/assets/images/icons/main/male.svg`} alt={firstName} />
          )}
          <p>
            Member since :{" "}
            {`${id.substring(4, 5)} ${id.substring(4, 6)} 200${id.substring(
              13,
              14
            )}`}
          </p>
        </div>
        <div className="contact-info">
          <img src={`/assets/images/icons/main/location.svg`} alt={lastName} />
          {title === "ms" && <p>Jakarta, Indonesia</p>}
          {title === "mr" && <p>Kuala Lumpur, Malaysia</p>}
          {title === "mrs" && <p>Perth, Australia</p>}
          {title === "miss" && <p>Bali, Indonesia</p>}
        </div>
      </div>
    </div>
  );
};
