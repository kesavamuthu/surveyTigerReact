import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CreateSurvey from "./CreateSurvey";
import TakeSurvey from "./TakeSurvey";

function init() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            {/* <Container
              className=""
              // style={{ transform: "translate(10%, 60%)", margin: "0" }}
            >
              <Row>
                <Col md={{ span: 6, offset: 3 }}> */}
            {/* <Card style={{ width: "18rem" }}> */}
            <div className="parent">
              <Link to="/create">
                <div className="m-5">
                  <Button variant="success">Create survey</Button>
                </div>
              </Link>
              <Link to="/take">
                <Button variant="success">Take survey</Button>
              </Link>
            </div>
            {/* </Card> */}
            {/* </Col>
              </Row>
            </Container> */}
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
