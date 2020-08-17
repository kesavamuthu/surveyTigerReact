import React from "react";
import { Row, Col, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Answers from "./AnswerForTakeSurvey";
import util from "../../utility/utility";
import "./takeSurvey.css";

class TakeSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      answers: [],
      selected: [],
    };
    this.answerUpdater = this.answerUpdater.bind(this);
    this.publish = this.publish.bind(this);
    this.apiCall = this.apiCall.bind(this);
  }

  componentDidMount() {
    this.apiCall();
  }

  apiCall() {
    util
      .requestMaker("", "get", "get")
      .then((val) => {
        this.setState({
          questions: val.data.questions.sort((a, b) => a.qNo - b.qNo),
          answers: val.data.answers.sort((a, b) => a.qNo - b.qNo),
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  publish() {
    let tmp = { ...this.state };
    let answers = tmp.answers;
    tmp.selected.forEach((options, i) => {
      options = Array.isArray(options) ? options : [options];
      util
        .requestMaker(
          { qNo: answers[i].qNo, options, formId: answers[i].formId },
          "post",
          "userinput"
        )
        .then((res) => console.log)
        .catch((err) => {
          console.error(err);
        });
    });
  }

  qAndans() {
    return this.state.questions.map((e, i) => (
      <Row key={"r" + i}>
        <Col md={{ span: 6, offset: 3 }}>
          <Alert
            variant="primary"
            style={{ textAlign: "left", fontSize: "1.5em" }}
            key={"q" + i}
          >
            {i + 1}) {this.state.questions[i].question}
          </Alert>

          <Answers
            questionType={this.state.questions[i].qType}
            answers={this.state.answers[i].options}
            answerUpdater={this.answerUpdater}
            key={i}
            belongsTo={i}
            selected={this.state.selected[i]}
          />
        </Col>
      </Row>
    ));
  }

  answerUpdater(idealIndex, ind) {
    let tmp = [...this.state.selected];
    if (this.state.questions[ind].qType === 2) tmp[ind] = idealIndex;
    else if (Array.isArray(tmp[ind])) {
      tmp[ind].indexOf(idealIndex) !== -1
        ? tmp[ind].splice(tmp[ind].indexOf(idealIndex), 1)
        : tmp[ind].push(idealIndex);
    } else if (tmp[ind] === idealIndex) tmp[idealIndex] = "";
    else {
      tmp[ind] = [];
      tmp[ind].push(idealIndex);
    }
    this.setState({
      selected: [...tmp],
    });
  }

  render() {
    return (
      <div style={{ marginTop: "10px" }}>
        {this.qAndans()}
        <Link to="/">
          <Button onClick={this.publish}>Submit </Button>
        </Link>
      </div>
    );
  }
}

export default TakeSurvey;
