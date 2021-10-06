import React, { useState } from "react";
import { Link } from "react-router-dom";
import { navOthers } from "../../data/navbar-data";

const NavMid = () => {
  const [selectOther, setSelectOther] = useState("other-1");

  const handleClick = (e) => {
    const id = e.currentTarget.id;
    if (selectOther === "id") {
      setSelectOther("other-1");
    } else {
      setSelectOther(id);
    }
  };

  return (
    <div className="nav-mid">
      {navOthers.map((item) => {
        const { id, name, url, hover, link } = item;
        return (
          <div key={id} className="nav-other other">
            <Link to={link}>
              <button className="btn-other" id={id} onClick={handleClick}>
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
      })}

      <div className="game other">
        <Link to="/">
          <button className="btn-other" id="other-5" onClick={handleClick}>
            <img
              src={
                selectOther === "other-5"
                  ? `/assets/images/icons/navbar/games-hover.svg`
                  : `/assets/images/icons/navbar/games.svg`
              }
              alt="logo"
            />
          </button>
        </Link>
      </div>
      <div className="more other">
        <Link to="/">
          <button className="btn-other" id="other-6" onClick={handleClick}>
            <img
              src={
                selectOther === "other-6"
                  ? `/assets/images/icons/navbar/more-hover.svg`
                  : `/assets/images/icons/navbar/more.svg`
              }
              alt="logo"
            />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavMid;
