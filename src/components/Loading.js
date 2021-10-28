import React from "react";

const Loading = () => {
  return (
    <div className="loading-container">
      <svg className="svg">
        <circle cx="70" cy="70" r="70" className="circle"></circle>
      </svg>

      <h1>Loading...</h1>
    </div>
  );
};

export default Loading;
