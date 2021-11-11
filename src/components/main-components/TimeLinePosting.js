import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useParams } from "react-router";
import TimelineSubmenu from "./TimelineSubmenu";
import AccountTimelineSubmenu from "../account/AccountTimelineSubmenu";

const defaultImage = "/assets/images/dogs/";

const TimeLinePosting = ({ props, totalLikes, commentList }) => {
  const { image, text, owner, publishDate } = props;
  const { id, firstName, lastName, picture } = owner;

  const date = moment(publishDate).format("MMMM DD, YYYY");

  const [showTimeline, setShowTimeline] = useState(false);
  const [showOwnerInfo, setShowOwnerInfo] = useState(false);
  const [showAccountTimeline, setshowAccountTimeline] = useState(false);

  const [dog, setDog] = useState(1);
  const params = useParams();
  useEffect(() => {
    if (!params) {
      return;
    }
  }, [params]);

  useEffect(() => {
    setDog(Math.floor(Math.random() * 7 + 1));
  }, []);

  const showingMenu = () => {
    if (!params) return;
    if (showTimeline || showAccountTimeline) {
      setShowTimeline(false);
      setshowAccountTimeline(false);
    } else {
      if (id === params.id) {
        setshowAccountTimeline(true);
      } else {
        setShowTimeline(true);
      }
    }
  };

  return (
    <div className="timeline-post timeline">
      <div
        className="tl-post-header"
        onMouseLeave={() => {
          setshowAccountTimeline(false);
          setShowTimeline(false);
        }}
      >
        <Link
          to={`/main/${params.id}/guest/${id}`}
          style={{ display: "flex", alignItems: "center" }}
        >
          <button
            className="tl-btn"
            id={id}
            onMouseOver={() => setShowOwnerInfo(true)}
            onMouseLeave={() => setShowOwnerInfo(false)}
          >
            {showOwnerInfo && <TimelineOwnerModal props={props} />}
            <img src={picture} alt={firstName} />
          </button>

          <div className="tl-id">
            <h4>{`${firstName} ${lastName}`}</h4>
            <h5>{date}</h5>
          </div>
        </Link>

        {!params.guest && (
          <button className="tl-more" onClick={() => showingMenu(id)}>
            <img src="/assets/images/icons/main/more.svg" alt="more" />
          </button>
        )}

        {showTimeline && <TimelineSubmenu props={props} />}
        {showAccountTimeline && <AccountTimelineSubmenu props={props} />}
      </div>
      <div className="tl-post-body">
        <p>{text}</p>
        <img
          src={image || `${defaultImage}defaultDog (${dog}).jpg`}
          alt={text.substring(1)}
        />
      </div>

      <div className="tl-post-icons">
        {totalLikes > 0 && (
          <div className="tl-likes">
            <img src="/assets/images/icons/main/likes-icon.svg" alt="like" />
            <p> {totalLikes}</p>
          </div>
        )}
        {commentList.length > 0 && (
          <div className="tl-comments-count">
            <p>{commentList.length}</p>
            <p>comments</p>
          </div>
        )}
      </div>

      <div className="line"></div>
    </div>
  );
};
export default TimeLinePosting;

const TimelineOwnerModal = ({ props }) => {
  const { owner } = props;
  const { id, firstName, lastName, picture, title } = owner;

  return (
    <div className="timeline-posting-owner">
      <img src={picture} alt={firstName} />
      <div className="tl-posting-contact-infos">
        <h2>{`${firstName} ${lastName}`}</h2>
        <div className="tl-posting-contact-info">
          <div className="tl-contact-info">
            {title === "ms" || title === "mrs" || title === "miss" ? (
              <img
                src={`/assets/images/icons/main/female.svg`}
                alt={firstName}
              />
            ) : (
              <img src={`/assets/images/icons/main/male.svg`} alt={firstName} />
            )}
            <p>
              Member since :
              {`${id.substring(4, 5)} ${id.substring(4, 6)} 200${id.substring(
                13,
                14
              )}`}
            </p>
          </div>
          <div className="contact-info">
            <img
              src={`/assets/images/icons/main/location.svg`}
              alt={lastName}
            />
            {title === "ms" && <p>Jakarta, Indonesia</p>}
            {title === "mr" && <p>Kuala Lumpur, Malaysia</p>}
            {title === "mrs" && <p>Perth, Australia</p>}
            {title === "miss" && <p>Bali, Indonesia</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
