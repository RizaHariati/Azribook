import React, { useState } from "react";
import Loading from "../../Loading";
import Error from "../../../Pages/Error";
import Story from "../Story";
import Posting from "../Posting";
import Timeline from "../Timeline";
import useFetchAllPosts from "../../../fetch/useFetchAllPosts";

const MainMid = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const { loadAllPosts, errorAll, allPosts, hasMore } =
    useFetchAllPosts(pageNumber);

  if (loadAllPosts) {
    return (
      <div className="timeline">
        <Loading />
      </div>
    );
  } else {
    if (errorAll) {
      return (
        <div className="timeline">
          <Error />
        </div>
      );
    } else {
      return (
        <div className="main-mid">
          <Story allPosts={allPosts} />
          <Posting />
          <Timeline
            setPageNumber={setPageNumber}
            allPosts={allPosts}
            loadAllPosts={loadAllPosts}
            hasMore={hasMore}
          />
        </div>
      );
    }
  }
};

export default MainMid;
