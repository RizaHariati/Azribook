import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { navOthers } from "../../data/navbar-data";
import { useNavContext } from "../../context/navContext";

const NavMid = () => {
  const { handleClick, handleMouse, mouseOver, selectOther, setMouseOver } =
    useNavContext();
  const location = useLocation().pathname;

  return (
    <div className="nav-mid">
      {navOthers.map((item) => {
        const { id, name, url, hover, link } = item;

        if (link === "*") {
          return (
            <div key={id} className={`nav-other other ${id}`}>
              <Link to={link}>
                <button
                  className="btn-other"
                  id={id}
                  onClick={handleClick}
                  onMouseEnter={handleMouse}
                  onMouseLeave={() => setMouseOver(null)}
                >
                  {mouseOver === id && <p>{name}</p>}
                  <img
                    src={
                      selectOther === id
                        ? `/assets/images/icons/navbar/${hover}.svg`
                        : `/assets/images/icons/navbar/${url}.svg`
                    }
                    alt={name}
                  />
                </button>
              </Link>
            </div>
          );
        } else {
          return (
            <div key={id} className={`nav-other other ${id}`}>
              <Link to={location.substring(0, 30) + `/${link}`}>
                <button
                  className="btn-other"
                  id={id}
                  onClick={handleClick}
                  onMouseEnter={handleMouse}
                  onMouseLeave={() => setMouseOver(null)}
                >
                  {mouseOver === id && <p>{name}</p>}
                  <img
                    src={
                      selectOther === id
                        ? `/assets/images/icons/navbar/${hover}.svg`
                        : `/assets/images/icons/navbar/${url}.svg`
                    }
                    alt={name}
                  />
                </button>
              </Link>
            </div>
          );
        }
      })}

      <div className="game other">
        <a href="https://www.facebook.com/gaming/">
          <button
            className="btn-other"
            id="other-5"
            onClick={handleClick}
            onMouseEnter={handleMouse}
            onMouseLeave={() => setMouseOver(null)}
          >
            <img
              src={
                selectOther === "other-5"
                  ? `/assets/images/icons/navbar/games-hover.svg`
                  : `/assets/images/icons/navbar/games.svg`
              }
              alt="logo"
            />
            {mouseOver === "other-5" && <p>games</p>}
          </button>
        </a>
      </div>
      <div className="more other">
        <Link to="/">
          <button
            className="btn-other"
            id="other-6"
            onClick={handleClick}
            onMouseEnter={handleMouse}
            onMouseLeave={() => setMouseOver(null)}
          >
            <img
              src={
                selectOther === "other-6"
                  ? `/assets/images/icons/navbar/more-hover.svg`
                  : `/assets/images/icons/navbar/more.svg`
              }
              alt="logo"
            />
            {mouseOver === "other-6" && <p>more</p>}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavMid;
