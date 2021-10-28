import React, { useCallback, useRef } from "react";
import TimeLinePosting from "./TimeLinePosting";
import TimeLineComment from "./TimeLineComment";
import TimeLineReaction from "./TimeLineReaction";

const Timeline = ({ setPageNumber, allPosts, loadAllPost, hasMore }) => {
  const observe = useRef();
  const lastElement = useCallback(
    (node) => {
      if (loadAllPost) return;
      if (observe.current) return observe.current.disconnect();
      observe.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting & hasMore) {
          return setPageNumber((prevPage) => prevPage + 1);
        }
      });

      if (node) observe.current.observe(node);
    },
    [loadAllPost, setPageNumber, hasMore]
  );

  return (
    <div className="timeline-container">
      {allPosts.map((post, postIndex) => {
        const { id, owner } = post;

        if (allPosts.length === postIndex + 1) {
          return (
            <div key={id} ref={lastElement} className="timeline-content">
              <TimeLinePosting owner={owner} {...post} />
              <TimeLineReaction />
              <TimeLineComment />
            </div>
          );
        } else {
          return (
            <div key={id} className="timeline-content">
              <TimeLinePosting owner={owner} {...post} />
              <TimeLineReaction />
              <TimeLineComment />
            </div>
          );
        }
      })}
    </div>
  );
};

export default Timeline;
