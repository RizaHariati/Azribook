import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/navbar/Nav";
import Account from "./Pages/Account";
import Home from "./Pages/Home/Home";
import Status from "./Pages/Status";
import Error from "./Pages/Error";
const App = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home />
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
