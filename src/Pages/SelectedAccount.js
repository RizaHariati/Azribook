import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Loading from "../components/Loading";
import Error from "./Error";
import Nav from "../components/navbar/Nav";
import Account from "./Account";
import Main from "../components/main-components/Main/Main";
import useFetchUserProfile from "../fetch/useFetchUserProfile";
import { useParams } from "react-router";
import { NavProvider } from "../context/navContext";
import { useGlobalContext } from "../context/appContext";
import Pages from "./Pages";
import TimeLineModal from "../components/main-components/TimeLineModal";

const SelectedAccount = () => {
  const { id } = useParams();
  const { loading, error, profile } = useFetchUserProfile(id);
  const { getParams, showTimelineModal } = useGlobalContext();

  const getID = async () => {
    await getParams(id);
  };

  useEffect(() => {
    // other code
    getID();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    if (error) {
      return <Error />;
    } else {
      return (
        <div className="container">
          <NavProvider>
            <Route path="/main/:id">
              <Nav />
            </Route>
          </NavProvider>
          {showTimelineModal && <TimeLineModal />}
          <Switch>
            <Route exact path="/main/:id">
              <Main />
            </Route>
            <Route exact path="/main/:id/pages">
              <Pages />
            </Route>
            <Route exact path={`/main/:id/account`}>
              <Account profile={profile} />
            </Route>
            <Route path={`/main/:id/guest/:guest`}>
              <Account profile={profile} />
            </Route>
            <Route path="*">
              <Error />
            </Route>
          </Switch>
        </div>
      );
    }
  }
};

export default SelectedAccount;
