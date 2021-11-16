import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "../../context/appContext";
const url_USER = " https://dummyapi.io/data/v1/user/";
const header = { "app-id": "615d134132c9c40bf2a39437" };

const AccountHeader = ({ pickID }) => {
  const { allUsers } = useGlobalContext();
  const [accountHeader, setAccountHeader] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { getGuestPosts } = useGlobalContext();

  useEffect(() => {
    let cancel;
    setLoading(true);
    setError(false);
    axios({
      method: "GET",
      url: url_USER + pickID + "/post?limit=6",
      headers: header,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        const data = res.data.data[4];
        const dataArray = res.data.data.map((item) => {
          const { image, text, owner } = item;
          const { firstName, lastName, picture } = owner;
          const posts = { image, text, owner, firstName, lastName, picture };
          return posts;
        });
        getGuestPosts(dataArray);
        setAccountHeader(data);
        setLoading(false);
      })
      .catch((error) => {
        if (axios.isAxiosError) {
          setError(true);
          setLoading(false);
        }
        console.log(error);
        setError(true);
        setLoading(false);
      });
    return () => {
      cancel();
    };
  }, [pickID, getGuestPosts]);
  if (loading) return <div></div>;
  if (error) return <div></div>;
  if (!accountHeader) return <div></div>;
  else {
    const { image, text, owner } = accountHeader;
    const { firstName, lastName, picture } = owner;
    return (
      <div className="account-header">
        <img src={image} alt={firstName} className="account-big-background" />
        <div className="header-owner">
          <div className="header-owner-picture">
            <img src={picture} alt={firstName} />
          </div>
          <div className="header-owner-info">
            <h2>{`${firstName} ${lastName}`}</h2>
            <p>{text}</p>
            <div className="header-friends">
              {allUsers &&
                allUsers
                  .filter((user, index) => index < 12)
                  .map((user) => {
                    const { id, picture, firstName } = user;

                    return <img key={id} src={picture} alt={firstName} />;
                  })}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default AccountHeader;
