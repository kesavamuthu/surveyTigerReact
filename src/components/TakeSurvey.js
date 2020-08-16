import React from "react";
import { Form, Button } from "react-bootstrap";
import Answers from "./AnswerForTakeSurvey";
import util from "../utility/utility";

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
      <>
        <Form.Label column lg={2}>
          {i + 1}) {this.state.questions[i].question}
        </Form.Label>

        <Answers
          questionType={this.state.questions[i].qType}
          answers={this.state.answers[i].options}
          answerUpdater={this.answerUpdater}
          key={i}
          belongsTo={i}
          selected={this.state.selected[i]}
        />
      </>
    ));
  }

  answerUpdater(event, ind) {
    console.log(event.target.value, ind, this.selected);
    let tmp = [...this.state.selected];
    let idealIndex = this.state.answers[ind].options.indexOf(
      event.target.value
    );
    console.log(idealIndex, this.state.answers[ind].options[idealIndex]);
    if (this.state.questions[ind].qType === 2) tmp[ind] = idealIndex;
    else if (Array.isArray(tmp[ind])) {
      tmp[ind].indexOf(idealIndex) != -1
        ? tmp[ind].splice(tmp[ind].indexOf(idealIndex), 1)
        : tmp[ind].push(idealIndex);
    } else if (tmp.indexOf(idealIndex) != -1)
      tmp.splice(tmp.indexOf(idealIndex), 1);
    else {
      tmp[ind] = [];
      tmp[ind].push(idealIndex);
    }
    this.setState({
      selected: [...tmp],
    });
  }

  render() {
    console.table(this.state.selected);
    console.table("current state", this.state);
    return (
      <>
        {this.qAndans()}
        <Button onClick={this.publish}>click </Button>
      </>
    );
  }
}

export default TakeSurvey;
