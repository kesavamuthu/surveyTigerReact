import React from "react";
import { Button } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CreateSurvey from "./createSurvey/CreateSurvey";
import TakeSurvey from "./takeSurvey/TakeSurvey";

function init() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <div
              className="parent"
              style={{
                height: "70vh",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Link to="/create">
                <div className="m-5">
                  <Button variant="success">Create survey</Button>
                </div>
              </Link>
              <Link to="/take">
                <Button variant="success" style={{ width: "105%" }}>
                  Take survey
                </Button>
              </Link>
            </div>
          </Route>
          <Route path="/create">
            <CreateSurvey />
          </Route>
          <Route path="/take">
            <TakeSurvey />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default init;
