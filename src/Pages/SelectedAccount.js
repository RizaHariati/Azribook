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

const SelectedAccount = () => {
  const id = useParams().id;
  const { loading, error, profile } = useFetchUserProfile(id);
  const { getParams } = useGlobalContext();
  useEffect(() => {
    getParams(id);
  }, [id, getParams]);
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
          <Switch>
            <Route exact path="/main/:id">
              <Main />
            </Route>
            <Route exact path={`/main/:id/account`}>
              <Account profile={profile} />
            </Route>
            <Route path={`/main/:id/guest/:guest`}>
              <Account profile={profile} />
            </Route>
          </Switch>
        </div>
      );
    }
  }
};

export default SelectedAccount;
