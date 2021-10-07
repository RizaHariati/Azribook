import React from "react";
import { useMainContext } from "../../context/mainContext";

const SelectUser = ({ baseData }) => {
  const { setUserID } = useMainContext();
  return (
    <div className="select-users-container">
      <h1 style={{ color: "white" }}>Select Your User</h1>
      <div className="select-users">
        {baseData.map((user) => {
          const { id, picture, firstName, lastName } = user;

          return (
            <button
              className="select-user"
              key={id}
              onClick={() => setUserID(id)}
            >
              <img src={picture} alt={firstName} />
              <h3>{`${firstName}  ${lastName}`}</h3>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SelectUser;
