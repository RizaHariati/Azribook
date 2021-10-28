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
    setLoadAllPosts(true);
    setErrorAll(false);
    axios({
      method: "GET",
      url: URL_ALLPOST,
      headers: header,
      params: { page: pageNumber, limit: 4 },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setAllPosts((prevPosts) => {
          return [...new Set([...prevPosts, ...res.data.data])];
        });
        setHasMore(res.data.data.length > 0);
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

  return { loadAllPosts, errorAll, allPosts, hasMore };
};

export default useFetchAllPosts;
