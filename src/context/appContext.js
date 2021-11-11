import React, {
  useContext,
  useState,
  createContext,
  useEffect,
  useCallback,
} from "react";
import useFetchBaseData from "../fetch/useFetchBaseData";

const AppContext = createContext();
const URL = "https://dummyapi.io/data/v1/comment";

const header = { "app-id": "615d134132c9c40bf2a39437" };
const AppProvider = ({ children }) => {
  const { loading, error, allUsers } = useFetchBaseData();
  const [pageNumber, setpageNumber] = useState(1);
  const [userProfile, setuserProfile] = useState(null);
  const [guestPosts, setGuestPosts] = useState(null);
  const [params, setparams] = useState("");
  const [commentForUser, setCommentForUser] = useState(null);
  const [showTimelineModal, setshowTimelineModal] = useState(false);
  const [timelineModalID, setTimelineModalID] = useState({
    id: "",
    data: { text: "" },
  });
  const [editedText, setEditedText] = useState(null);
  const [newPost, setNewPost] = useState(null);

  const getComment = useCallback(async () => {
    try {
      // const res = await fetch(`${URL}${user}${addURL}`, { headers: header });
      const res = await fetch(`${URL}`, { headers: header });
      const comments = await res.json();
      setCommentForUser(comments.data);
    } catch (error) {
      console.log(error);
    }
  }, [setCommentForUser]);

  const getParams = useCallback(
    (id) => {
      return setparams(id);
    },
    [setparams]
  );

  useEffect(() => {
    if (userProfile) {
      getComment(userProfile.id);
    }
  }, [userProfile, getComment]);

  const getGuestPosts = useCallback(
    (posts) => {
      return setGuestPosts(posts);
    },
    [setGuestPosts]
  );

  useEffect(() => {
    let selectedPerson = params;
    if (allUsers && params) {
      const users = allUsers.find((user) => user.id === selectedPerson);
      setuserProfile({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        picture: users.picture,
      });
    }
    return () => {
      selectedPerson = "";
    };
  }, [allUsers, params]);

  return (
    <AppContext.Provider
      value={{
        pageNumber,
        setpageNumber,
        loading,
        error,
        allUsers,
        getParams,
        userProfile,
        guestPosts,
        getGuestPosts,
        commentForUser,
        showTimelineModal,
        setshowTimelineModal,
        timelineModalID,
        setTimelineModalID,
        editedText,
        setEditedText,
        newPost,
        setNewPost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppProvider, AppContext, useGlobalContext };
