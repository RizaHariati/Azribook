import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/navbar/Nav";
import Account from "./Pages/Account";
import Main from "./Pages/Main/Main";
import Status from "./Pages/Status";
import Error from "./Pages/Error";
import { NavProvider } from "./context/navContext";
const App = () => {
  return (
    <Router>
      <NavProvider>
        <Nav />
      </NavProvider>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/account">
          <Account />
        </Route>
        <Route path="/status">
          <Status />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
