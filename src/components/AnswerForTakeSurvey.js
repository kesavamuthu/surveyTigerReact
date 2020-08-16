import React from "react";
import { Card, Form } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function AnswerForTakeSurvey(props) {
  let type = ["checkbox", "radio"];
  let name;
  type = type[props.answers.length === 2 ? 1 : 0];
  let res = props.answers.map((e, i) => {
    // name = type === "checkbox" ? i : "radio";
    return (
      <div key={`default-${i + type}`} className="mb-3">
        <Form.Check
          type={type}
          id={`default-${type}`}
          label={e}
          //   name={name}
          value={e}
          checked={props.selected && props.selected.indexOf(e) !== -1}
          onClick={(event) => {
            props.answerUpdater(event, props.belongsTo);
          }}
        />
      </div>
    );
  });
  return <div class="parent">{res}</div>;
}

export default AnswerForTakeSurvey;
