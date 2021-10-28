import React, {
  useContext,
  useState,
  createContext,
  useEffect,
  useCallback,
} from "react";
import useFetchBaseData from "../fetch/useFetchBaseData";
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const { loading, error, allUsers } = useFetchBaseData();
  const [accountHeader, setAccountHeader] = useState(false);
  const [pageNumber, setpageNumber] = useState(1);
  const [userProfile, setuserProfile] = useState(null);
  const [guestPosts, setGuestPosts] = useState(null);
  const [params, setparams] = useState("");

  const getParams = useCallback(
    (id) => {
      return setparams(id);
    },
    [setparams]
  );

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
        firstName: users.firstName,
        lastName: users.lastName,
        picture: users.picture,
      });
    }
    return () => {
      selectedPerson = "";
    };
  }, [allUsers, params]);

  const showAccountHeader = () => {
    return setAccountHeader(true);
  };

  const hideAccountHeader = () => {
    return setAccountHeader(false);
  };

  return (
    <AppContext.Provider
      value={{
        showAccountHeader,
        hideAccountHeader,
        accountHeader,
        pageNumber,
        setpageNumber,
        loading,
        error,
        allUsers,
        getParams,
        userProfile,
        guestPosts,
        getGuestPosts,
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
