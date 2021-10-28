import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Error from "./Pages/Error";
import SelectUser from "./Pages/SelectUser";
import NavLeft from "./components/navbar/NavLeft";
import SelectedAccount from "./Pages/SelectedAccount";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={SelectUser} />
        <Route path="/main/:id" component={SelectedAccount} />
        <Route path="*">
          <div>
            <div className="navbar-container">
              <NavLeft />
            </div>
            <Error />
          </div>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
