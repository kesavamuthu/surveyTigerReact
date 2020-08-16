import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Answers(props) {
  const show = false;
  let answers = props.answers.map((e) => e);
  console.log("questionType", props.questionType);
  const limit = show ? 2 : answers.length;
  let values = props.questionType == 2 ? ["Yes", "No"] : answers;
  let result = options(
    limit,
    values,
    props.belongsTo,
    props.inputCounter,
    props.optionRemover,
    props.questionType == 2
  );
  return (
    <div
      onChange={(event) => {
        props.answerUpdater(event);
      }}
    >
      {result}
    </div>
  );
}

function options(limit, value, belongsTo, increment, decrement, disabled) {
  let result = [];
  for (let i = 0; i < limit; ++i)
    result.push(
      <InputGroup key={i} className="mt-2 mb-2">
        <FormControl
          placeholder="Type answer here"
          aria-label="answers"
          aria-describedby="basic-addon2"
          value={value[i]}
          name={belongsTo + "q" + i}
        />
        <InputGroup.Append>
          <Button
            variant="success"
            onClick={increment}
            data-value={belongsTo + "q" + i}
            disabled={disabled}
          >
            +
          </Button>
          <Button
            variant="danger"
            onClick={decrement}
            data-set="decrement"
            data-value={belongsTo + "q" + i}
            disabled={disabled}
          >
            -
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );

  return result;
}

export default Answers;
