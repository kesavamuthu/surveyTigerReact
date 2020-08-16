import React from "react";

import "./App.css";
import Init from "./components/init";
import config from "./config";
import Avatar from "./components/Avatar";
import Example from "./components/example";
import CreateSurvey from "./components/CreateSurvey";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TakeSurvey from "./components/TakeSurvey";

function App() {
  return (
    <div style={{ backgroundColor: "#ffa8B6", height: "100vh" }}>
      <div className="App" style={{ position: "relative", top: "2vh" }}>
        <Avatar url={config.imgSrc} />
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
    </div>
  );
}

export default App;
