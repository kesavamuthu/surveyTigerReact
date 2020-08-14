import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Question(props) {
  return (
    <>
      <InputGroup className="mb-5 mt-5">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">?</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Type question here"
          aria-label="question"
          aria-describedby="basic-addon1"
          name={props.name}
          value={props.qValue}
          onChange={(event) => {
            props.questionUpdater(event);
          }}
        />
      </InputGroup>
      Options :
    </>
  );
}

export default Question;
