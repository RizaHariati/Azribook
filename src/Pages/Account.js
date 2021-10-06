import React from "react";
import { Link } from "react-router-dom";

const Account = () => {
  return (
    <div className="account">
      <h1>Account</h1>
      <Link to="/">
        <button>Home</button>
      </Link>
    </div>
  );
};

export default Account;
