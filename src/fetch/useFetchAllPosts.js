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
          if (!prevPosts) {
            return [...data2, ...data1];
          } else {
            const newData = [...new Set(data2.map((data) => data.id))];
            const filteredPost = prevPosts.filter((post) => {
              return !newData.includes(post.id);
            });
            return [...new Set([...data2, ...filteredPost, ...data1])];
          }
        });
        setHasMore(data1.length > 0);
        setLoadAllPosts(false);
        setErrorAll(false);
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
