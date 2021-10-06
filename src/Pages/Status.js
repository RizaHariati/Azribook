import React from "react";
import { Link } from "react-router-dom";

const Status = () => {
  return (
    <div className="status">
      <h1>Status</h1>
      <Link to="/">
        <button className="btn">Home</button>
      </Link>
    </div>
  );
};

export default Status;
