import React from "react";
import { ListGroup, Form } from "react-bootstrap";

function AnswerForTakeSurvey(props) {
  let type = ["checkbox", "radio"];
  type = type[+props.questionType === 2 ? 1 : 0];
  // let color = +props.questionType !== 2 ? "#df6504" : "#160405";
  let classValue = +props.questionType !== 2 ? "" : "mb-3 twoOptions";
  let res = props.answers.map((e, i) => {
    return (
      <ListGroup.Item
        style={{
          textAlign: "left",
          // backgroundColor: "#df6504",
          cursor: "pointer",
        }}
        variant={+props.questionType !== 2 ? "secondary" : "info"}
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
  return <ListGroup className={classValue}>{res}</ListGroup>;

  function statusDecider(i) {
    if (Array.isArray(props.selected)) return props.selected.indexOf(i) !== -1;
    return props.selected === i;
  }
}

export default AnswerForTakeSurvey;
