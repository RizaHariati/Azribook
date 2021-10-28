import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const url_USER = "https://dummyapi.io/data/v1/user/";
const header = { "app-id": "615d134132c9c40bf2a39437" };

const useFetchUserProfile = (params) => {
  const [loading, setLoading] = useState(true);
  const [profile, setprofile] = useState({});
  const [error, setError] = useState(false);

  const fetchData = useCallback(() => {
    let cancel;
    setLoading(true);
    setError(false);

    axios({
      method: "GET",
      url: url_USER + params,
      headers: header,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setprofile(res.data);
        setLoading(false);
      })
      .catch((error) => {
        if (axios.isAxiosError) {
          setError(true);
          setLoading(false);
        }
        setError(true);
        setLoading(false);
      });
    return () => {
      cancel();
    };
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return { loading, profile, error };
};

export default useFetchUserProfile;
