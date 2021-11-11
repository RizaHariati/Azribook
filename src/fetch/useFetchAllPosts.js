import { useState, useEffect } from "react";
import axios from "axios";

const URL_ALLPOST = "https://dummyapi.io/data/v1/post?";
const header = { "app-id": "615d134132c9c40bf2a39437" };

const useFetchAllPosts = (pageNumber) => {
  const [loadAllPosts, setLoadAllPosts] = useState(true);
  const [errorAll, setErrorAll] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    let cancel;
    setLoadAllPosts(false);
    setErrorAll(false);
    axios
      .all([
        axios({
          method: "GET",
          url: URL_ALLPOST,
          headers: header,
          params: { page: pageNumber, limit: 8 },
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        }),
        axios({
          method: "GET",
          url: `https://dummyapi.io/data/v1/post?created=1`,
          headers: header,
          params: { limit: 5 },
        }),
      ])
      .then(([res1, res2]) => {
        const data1 = res1.data.data;
        const data2 = res2.data.data.filter((item, index) => index < 2);
        setAllPosts((prevPosts) => {
          return [...data2, ...new Set([...prevPosts, ...data1])];
        });
        setHasMore(data1.length > 0);
        setLoadAllPosts(false);
      })
      .catch((error) => {
        if (axios.isAxiosError) {
          setErrorAll(true);
          setLoadAllPosts(false);
          return;
        }
        setErrorAll(true);
        setLoadAllPosts(false);
      });
    return () => {
      cancel();
    };
  }, [pageNumber]);

  return {
    loadAllPosts,
    errorAll,
    allPosts,
    setAllPosts,
    hasMore,
    setLoadAllPosts,
  };
};

export default useFetchAllPosts;
