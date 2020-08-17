import React from "react";

import "./App.css";
import Init from "./components/index";
import config from "./config";
import Avatar from "./components/Avatar";
import CreateSurvey from "./components/createSurvey/CreateSurvey";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TakeSurvey from "./components/takeSurvey/TakeSurvey";

function App() {
  return (
    <div className="App" style={{ position: "relative", top: "2vh" }}>
      {/* <Link to="/"> */}
      <Avatar url={config.imgSrc} />
      {/* </Link> */}
      <Router>
        <Switch>
          <Route exact path="/">
            <Init />
          </Route>
          <Route path="/create">
            <CreateSurvey />
          </Route>
          <Route path="/take">
            <TakeSurvey />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
