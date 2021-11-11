import React, { useCallback, useRef, useState, useEffect } from "react";
import TimeLinePosting from "./TimeLinePosting";
import TimeLineComment from "./TimeLineComment";
import TimeLineReaction from "./TimeLineReaction";
import Loading from "../../components/Loading";
import Error from "../../Pages/Error";
import useFetchAllPosts from "../../fetch/useFetchAllPosts";
import { useGlobalContext } from "../../context/appContext";
import axios from "axios";

const URL_POST = "https://dummyapi.io/data/v1/";
const header = { "app-id": "615d134132c9c40bf2a39437" };

const Timeline = () => {
  const {
    timelineModalID,
    setshowTimelineModal,
    editedText,
    setTimelineModalID,
    setEditedText,
  } = useGlobalContext();
  const [pageNumber, setPageNumber] = useState(1);

  const { loadAllPosts, errorAll, allPosts, hasMore, setAllPosts } =
    useFetchAllPosts(pageNumber);
  const observe = useRef();
  const lastElement = useCallback(
    (node) => {
      if (loadAllPosts) return;
      if (observe.current) return observe.current.disconnect();
      observe.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting & hasMore) {
          return setPageNumber((prevPage) => prevPage + 1);
        }
      });

      if (node) observe.current.observe(node);
    },
    [loadAllPosts, setPageNumber, hasMore]
  );
  // ====================functions on CRUD===============

  useEffect(() => {
    // other code
    if (!timelineModalID) return;
    if (timelineModalID.id === "hide") {
      hidingPost(timelineModalID.data.id);
    } else if (timelineModalID.id === "unfollow") {
      deletingUser(timelineModalID.data.owner.id);
    } else if (timelineModalID.id === "delete") {
      const id = timelineModalID.data.id;
      deletingPosts(id);
    } else if (timelineModalID.id === "edit-send") {
      setshowTimelineModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timelineModalID]);

  const deletingPosts = async (id) => {
    const filteredPosts = allPosts.filter((post) => post.id !== id);
    setAllPosts(filteredPosts);
    axios
      .delete(`${URL_POST}post/${id}`, { headers: header })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    await setshowTimelineModal(true);
    setTimeout(() => {
      setshowTimelineModal(false);
      setTimelineModalID({ id: "", data: { text: "" } });
    }, 1000);
  };

  const deletingUser = async (id) => {
    const filteredUsers = allPosts.filter((post) => {
      const ownerPost = post.owner.id;

      return ownerPost !== id;
    });
    setAllPosts(filteredUsers);
    axios
      .delete(`${URL_POST}user/${id}`, { headers: header })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    await setshowTimelineModal(true);
    setTimeout(() => {
      setshowTimelineModal(false);
      setTimelineModalID({ id: "", data: { text: "" } });
    }, 1000);
  };

  const hidingPost = async (id) => {
    const filteredPosts = allPosts.filter(
      (post) => post.id !== timelineModalID.data.id
    );
    axios
      .delete(`${URL_POST}post/${id}`, { headers: header })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setAllPosts(filteredPosts);
    await setshowTimelineModal(true);
    setTimeout(() => {
      setshowTimelineModal(false);
      setTimelineModalID({ id: "", data: { text: "" } });
    }, 1000);
  };

  useEffect(() => {
    // other code
    if (!editedText) return;
    else {
      const updatedPost = async () => {
        const { postID, methodID, data } = await editedText;
        const { image, likes, owner, text } = data;

        const id = owner.id;

        axios({
          method: "put",
          headers: header,
          url: `${URL_POST}post/${postID}`,
          data: { text, image, likes, owner: id },
        })
          .then((res) => {
            console.log(res);
            const data = res.data;

            setTimelineModalID({ id: methodID, data });
            setshowTimelineModal(true);

            setTimeout(() => {
              setshowTimelineModal(false);
              setEditedText(null);
              setTimelineModalID({ id: "", data: { text: "" } });
            }, 1000);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      updatedPost();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editedText]);

  return (
    <div className="timeline-container">
      {allPosts.map((post, postIndex) => {
        const { id } = post;
        if (allPosts.length === postIndex + 1) {
          return (
            <div key={id} ref={lastElement}>
              <TimeLineEach props={post} posts={allPosts} />
            </div>
          );
        } else {
          return (
            <div key={id}>
              <TimeLineEach props={post} posts={allPosts} />
            </div>
          );
        }
      })}
      {loadAllPosts && (
        <div className="timeline">
          <Loading />
        </div>
      )}
      {errorAll && (
        <div className="timeline">
          <Error />
        </div>
      )}
    </div>
  );
};

export default Timeline;

const TimeLineEach = ({ props, allPosts }) => {
  const [totalLikes, setTotalLikes] = useState(props.likes);
  const [showComment, setShowComment] = useState(false);
  const [commentList, setCommentList] = useState([]);

  return (
    <div className="timeline-content">
      <TimeLinePosting
        props={props}
        posts={allPosts}
        totalLikes={totalLikes}
        commentList={commentList}
      />
      <TimeLineReaction
        setTotalLikes={setTotalLikes}
        setShowComment={setShowComment}
        id={props.id}
        setCommentList={setCommentList}
      />
      {showComment && (
        <TimeLineComment
          id={props.id}
          commentList={commentList}
          setCommentList={setCommentList}
        />
      )}
    </div>
  );
};
