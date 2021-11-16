import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/appContext";
import NavLeft from "../components/navbar/NavLeft";
import Loading from "../components/Loading";
import Error from "./Error";

const SelectUser = () => {
  const { loading, error, allUsers } = useGlobalContext();
  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="select-users-container">
      <div className="navbar-container">
        <NavLeft />
      </div>
      <div className="select-users-content">
        <div className="select-users-banner">
          <h2>
            <span>Azribook</span> is a mockup page based on facebook design for
            my study
          </h2>
          <h1>Select Your User</h1>
        </div>
        <div className="select-users">
          {allUsers
            .sort(() => 0.5 - Math.random())
            .filter((user, index) => {
              return index > 0 && index < 13;
            })
            .map((user) => {
              const { id, picture, firstName, lastName } = user;
              return (
                // when clicked go to file selected user
                <Link key={id} to={`/main/${id}`} className="select-user-link">
                  <button className="select-user">
                    <img src={picture} alt={firstName} />
                    <h4>{`${firstName}  ${lastName}`}</h4>
                  </button>
                </Link>
              );
            })}
        </div>
      </div>
      <div className="thank-you">
        <p>
          All the data is thanks to
          <a href="https://dummyapi.io/" target="_blank" rel="noreferrer">
            DUMMYAPI.IO
          </a>
          , ready to use API Service full of dummy fake data
        </p>
      </div>
    </div>
  );
};

export default SelectUser;
