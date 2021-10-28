import { useEffect, useState, useCallback } from "react";
import axios from "axios";
const url = "https://dummyapi.io/data/v1/user?";
const headers = { "app-id": "615d134132c9c40bf2a39437" };

const useFetchBaseData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [allUsers, setAllUsers] = useState(null);

  const fetchData = useCallback(() => {
    let cancel;
    setLoading(true);
    setError(false);

    axios({
      method: "GET",
      url: url,
      headers: headers,
      params: { limit: 20 },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setAllUsers(res.data.data);
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
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { loading, error, allUsers };
};

export default useFetchBaseData;
