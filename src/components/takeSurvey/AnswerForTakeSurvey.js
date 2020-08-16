import React from "react";
import { ListGroup, Form } from "react-bootstrap";

function AnswerForTakeSurvey(props) {
  let type = ["checkbox", "radio"];
  type = type[+props.questionType === 2 ? 1 : 0];
  let res = props.answers.map((e, i) => {
    return (
      <ListGroup.Item
        style={{ textAlign: "left", backgroundColor: "#df6504" }}
        variant="info"
        className="mb-3"
        onClick={() => {
          props.answerUpdater(i, props.belongsTo);
        }}
        key={i}
      >
        <Form.Check
          type={type}
          id={e + i}
          label={e}
          checked={statusDecider(i)}
          key={i}
        />
      </ListGroup.Item>
    );
  });
  return <ListGroup>{res}</ListGroup>;

  function statusDecider(i) {
    if (Array.isArray(props.selected)) return props.selected.indexOf(i) !== -1;
    return props.selected === i;
  }
}

export default AnswerForTakeSurvey;
