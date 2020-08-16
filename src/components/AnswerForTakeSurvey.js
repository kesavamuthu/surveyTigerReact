import React from "react";
import { Card, Form } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function AnswerForTakeSurvey(props) {
  let type = ["checkbox", "radio"];
  let name;
  type = type[+props.questionType === 2 ? 1 : 0];
  let res = props.answers.map((e, i) => {
    // name = type === "checkbox" ? i : "radio";
    return (
      <div key={`default-${i + type}`} className="mb-3">
        <Form.Check
          type={type}
          id={e + i}
          label={e}
          //   name={name}
          value={e}
          checked={statusDecider(i)}
          onClick={(event) => {
            props.answerUpdater(event, props.belongsTo);
          }}
        />
      </div>
    );
  });
  return <div class="parent">{res}</div>;

  function statusDecider(i) {
    if (Array.isArray(props.selected)) return props.selected.indexOf(i) !== -1;
    return props.selected === i;
  }
}

export default AnswerForTakeSurvey;
