import React from "react";
import { Card, Button } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CreateSurvey from "./CreateSurvey";
import TakeSurvey from "./TakeSurvey";

function init() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Card style={{ width: "18rem" }}>
              <Link to="/create">
                <Button variant="success">Create survey</Button>
              </Link>
              <Link to="/take">
                <Button variant="success">Take survey</Button>
              </Link>
            </Card>
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
