import React, { useContext, useState, useEffect } from "react";

const AppContext = React.createContext();
const baseURL = "https://dummyapi.io/data/v1/";
const headers = { "app-id": "615d134132c9c40bf2a39437" };
const userURL = `${baseURL + "user?page=1&limit=10"}`;
const postURL = `${baseURL + "post?page=1&limit=20"}`;

const AppProvider = ({ children }) => {
  const [baseData, setBaseData] = useState(null);
  const [userID, setUserID] = useState("0");
  const [userProfile, setuserProfile] = useState(null);
  const [allPosts, setAllPosts] = useState(null);
  const [userPosts, setuserPosts] = useState(null);

  const fetchData = async () => {
    const res = await fetch(userURL, { headers });
    const dataResp = await res.json();
    setBaseData(dataResp.data);

    const res2 = await fetch(postURL, { headers });
    const dataResp2 = await res2.json();
    setAllPosts(dataResp2.data);
  };

  const fetchUser = async (userID) => {
    try {
      const res = await fetch(`${baseURL + "user/" + userID}`, { headers });
      const dataResp = await res.json();
      setuserProfile(dataResp);

      const res2 = await fetch(
        `${baseURL + "user/" + userID + "/post?limit=10"}`,
        { headers }
      );
      const dataPost = await res2.json();

      setuserPosts(dataPost.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (userID === "0") {
      console.log("pick one user");
    } else {
      fetchUser(userID);
    }
  }, [userID]);
  return (
    <AppContext.Provider
      value={{
        baseData,
        userID,
        setUserID,
        userProfile,
        userPosts,
        allPosts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
const useMainContext = () => {
  return useContext(AppContext);
};
export { AppProvider, AppContext, useMainContext };
