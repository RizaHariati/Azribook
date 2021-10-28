import { useState, useEffect } from "react";
import axios from "axios";
const URL_POST = "https://dummyapi.io/data/v1/user/";
const header = { "app-id": "615d134132c9c40bf2a39437" };

const useFetchUserProfile = (userID) => {
  const [loadingData, setloadingData] = useState(true);
  const [userPosts, setUserPosts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancel;

    setloadingData(true);
    setError(false);

    axios({
      method: "GET",
      url: URL_POST + userID + "/post?limit=10",
      headers: header,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        const data = res.data.data;
        setUserPosts(data);
        setloadingData(false);
      })
      .catch((error) => {
        if (axios.isAxiosError) {
          setError(true);
          setloadingData(false);
        }
        setError(true);
        setloadingData(false);
      });

    return () => {
      cancel();
    };
  }, [userID]);

  return { loadingData, userPosts, error };
};

export default useFetchUserProfile;
