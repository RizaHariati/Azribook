import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavLeft = () => {
  const [showSearch, setShowSearch] = useState(true);

  return (
    <div className="nav-left">
      <Link to="/">
        <div className="logo">
          <img src="/assets/images/icons/navbar/logo.png" alt="logo" />
        </div>
      </Link>
      <form className="search">
        {showSearch && (
          <img src="/assets/images/icons/navbar/search.png" alt="logo" />
        )}
        <input
          type="text"
          placeholder="Search Azribook"
          onClick={() => {
            setShowSearch(!showSearch);
          }}
        />
      </form>
    </div>
  );
};

export default NavLeft;
