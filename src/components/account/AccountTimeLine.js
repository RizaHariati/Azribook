import React, { useState, useCallback, useEffect } from "react";
import useFetchAccount from "../../fetch/useFetchAccount";
import TimeLineReaction from "../main-components/TimeLineReaction";
import TimeLinePosting from "../main-components/TimeLinePosting";
import TimeLineComment from "../main-components/TimeLineComment";
import { useGlobalContext } from "../../context/appContext";
import Loading from "../Loading";
import axios from "axios";

const URL_POST = "https://dummyapi.io/data/v1/";
const header = { "app-id": "615d134132c9c40bf2a39437" };

const AccountTimeLine = ({ pickID }) => {
  const {
    timelineModalID,
    setshowTimelineModal,
    editedText,
    setTimelineModalID,
    setEditedText,
  } = useGlobalContext();
  const [userID, setUserID] = useState(null);
  const getUserID = useCallback(
    (id) => {
      setUserID(id);
    },
    [setUserID]
  );

  useEffect(() => {
    getUserID(pickID);
  }, [pickID, getUserID]);

  const { loadingData, userPosts, setUserPosts, setloadingData } =
    useFetchAccount(userID);

  // ====================functions on CRUD===============

  useEffect(() => {
    // other code

    if (!timelineModalID) return;
    if (timelineModalID.id === "delete") {
      const id = timelineModalID.data.id;
      deletingPosts(id);
    } else if (timelineModalID.id === "edit-send") {
      setshowTimelineModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timelineModalID]);

  const deletingPosts = async (id) => {
    const filteredPosts = userPosts.filter((post) => post.id !== id);
    setUserPosts(filteredPosts);
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

  useEffect(() => {
    // other code
    if (!editedText) return;
    else {
      const updatedPost = async () => {
        const { postID, methodID, data } = await editedText;
        const { image, likes, owner, text } = data;

        const id = owner.id;

        setloadingData(true);
        axios({
          method: "put",
          headers: header,
          url: `${URL_POST}post/${postID}`,
          data: { text, image, likes, owner: id },
        })
          .then((res) => {
            console.log(res);
            const data = res.data;
            setloadingData(false);
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
            setloadingData(false);
          });
      };
      updatedPost();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editedText]);

  return (
    <div className="timeline-container  timeline-account">
      <div className="timeline-content">{loadingData && <Loading />}</div>
      {userPosts.map((post) => {
        const { id } = post;
        return <TimeLineEach key={id} props={post} userPosts={userPosts} />;
      })}
    </div>
  );
};
export default AccountTimeLine;

const TimeLineEach = ({ props, userPosts }) => {
  const [totalLikes, setTotalLikes] = useState(props.likes);
  const [showComment, setShowComment] = useState(false);
  const [commentList, setCommentList] = useState([]);
  return (
    <div className="timeline-content">
      <TimeLinePosting
        props={props}
        userPosts={userPosts}
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
