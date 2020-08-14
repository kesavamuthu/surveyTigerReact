import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Answers(props) {
  const show = false;
  //   console.log(props);
  let answers = props.answers.map((e) => e);
  //   const [count, setCount] = useState(answers.length);
  //   const increment = () => setCount(count + 1);
  //   const decrement = () => setCount(count - 1);

  const limit = show ? 2 : answers.length;
  //   console.log(show, limit);
  let values = limit === 2 && !answers.length ? ["Yes", "No"] : answers;
  let result = twoOptions(
    limit,
    values,
    props.belongsTo,
    props.inputCounter,
    props.optionRemover
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

function twoOptions(limit, value, belongsTo, increment, decrement) {
  let result = [];
  for (let i = 0; i < limit; ++i)
    result.push(
      <InputGroup key={i}>
        <FormControl
          placeholder="Type answer here"
          aria-label="answers"
          aria-describedby="basic-addon2"
          value={value[i]}
          name={belongsTo + "q" + i}
        />
        <InputGroup.Append>
          <Button
            variant="outline-secondary"
            onClick={increment}
            data-value={belongsTo + "q" + i}
          >
            +
          </Button>
          <Button
            variant="outline-secondary"
            onClick={decrement}
            data-set="decrement"
            data-value={belongsTo + "q" + i}
          >
            -
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );

  return result;
}

export default Answers;
