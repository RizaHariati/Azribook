import React from "react";

const Loading = () => {
  return (
    <div className="loading-container">
      <svg className="svg">
        <circle cx="50" cy="50" r="50" className="circle"></circle>
      </svg>

      <h1>Loading...</h1>
    </div>
  );
};

export default Loading;
