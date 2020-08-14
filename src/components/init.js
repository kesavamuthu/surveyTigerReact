import React from "react";
import { Card, Button } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CreateSurvey from "./CreateSurvey";

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
              <Button variant="success">Take survey</Button>
            </Card>
          </Route>
          <Route path="/create">
            <CreateSurvey />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default init;
