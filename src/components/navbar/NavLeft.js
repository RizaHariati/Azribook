import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/appContext";
import { useHistory, useLocation } from "react-router";

const NavLeft = () => {
  const { allUsers } = useGlobalContext();
  const [showSearch, setShowSearch] = useState(false);
  const [text, setText] = useState("");
  const [listUsers, setListUsers] = useState([]);

  const history = useHistory();
  const location = useLocation();
  const handleChange = (e) => {
    setShowSearch(true);
    e.preventDefault();
    setText(e.target.value.toLowerCase());
  };

  useEffect(() => {
    // other code
    if (text === "") setListUsers([]);
    else {
      let mainID;
      if (location.pathname.toString().length > 20)
        mainID = location.pathname.substring(6, 30);
      console.log(mainID);
      const newAllUsers = allUsers.filter((user) => user.id !== mainID);
      const list = newAllUsers.filter((user) => {
        return (
          user.firstName.toLowerCase().includes(text) ||
          user.firstName.toLowerCase().includes(text)
        );
      });
      setListUsers(list);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, allUsers]);

  const searchGuest = (id) => {
    if (location.pathname.toString().length > 20)
      history.push(`${location.pathname.substring(0, 30)}/guest/${id}`);
    else {
      history.push(`/main/${id}`);
    }
    setShowSearch(false);
    setText("");
  };
  return (
    <div
      className="nav-left"
      onMouseLeave={() => {
        setShowSearch(false);
        setText("");
      }}
    >
      {!showSearch && (
        <Link to="/">
          <div className="logo">
            <img src="/assets/images/icons/navbar/logo.png" alt="logo" />
            <h3>Back to Selecting Users</h3>
          </div>
        </Link>
      )}
      {showSearch && (
        <button
          onClick={() => setShowSearch(false)}
          style={{
            background: "transparent",
            border: "transparent",
            cursor: "pointer",
          }}
        >
          <img
            src="/assets/images/icons/navbar/left-arrow.svg"
            alt="left-arrow"
          />
        </button>
      )}
      <form className="search">
        {showSearch && (
          <img src="/assets/images/icons/navbar/search.png" alt="logo" />
        )}
        <input
          type="text"
          value={text}
          placeholder="Search Azribook"
          onChange={(e) => {
            handleChange(e);
          }}
          onClick={() => {
            setShowSearch(true);
          }}
        />
      </form>
      {listUsers.length > 0 && showSearch && (
        <NavLeftSubmenu listUsers={listUsers} searchGuest={searchGuest} />
      )}
    </div>
  );
};

export default NavLeft;

const NavLeftSubmenu = ({ listUsers, searchGuest }) => {
  return (
    <div className="navleft-submenu-container">
      {listUsers.map((user) => {
        const { id, firstName, lastName, picture } = user;
        return (
          <button
            key={id}
            className="navleft-submenu-links"
            onClick={() => searchGuest(id)}
          >
            <div className="navleft-submenu-link">
              <img src={picture} alt={firstName} />
              <p>{`${firstName} ${lastName}`}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};
