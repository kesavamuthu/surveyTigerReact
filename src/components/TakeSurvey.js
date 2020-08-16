import React from "react";
import { Form } from "react-bootstrap";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import QuestionType from "./QuestionType";
// import QuestionMaker from "./QuestionMaker";
import Answers from "./AnswerForTakeSurvey";
import util from "../utility/utility";

class TakeSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      answers: [],
      currentQuestionType: "",
      selected: [],
    };
    this.answerUpdater = this.answerUpdater.bind(this);
    this.optionRemover = this.optionRemover.bind(this);
    this.publish = this.publish.bind(this);
    this.apiCall = this.apiCall.bind(this);
  }

  componentDidMount() {
    this.apiCall();
  }

  componentWillUpdate() {
    console.log("updated ");
  }

  apiCall() {
    util
      .requestMaker("", "get", "get")
      .then((val) => {
        this.setState({
          questions: val.data.questions,
          answers: val.data.answers,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  publish() {
    let tmp = this.state;
    Object.keys(tmp).forEach((e) => {
      if (e === "questions" || e === "answers")
        tmp[e].forEach((ele, i) => {
          util
            .requestMaker(ele, "post", e === "questions" ? "set" : "setans")
            .then((res) => console.log)
            .catch((err) => {
              console.error(err);
            });
        });
    });
  }

  qAndans() {
    return this.state.questions.map((e, i) => (
      <>
        <Form.Label column lg={2}>
          {i + 1 + ") "}
          {this.state.questions[i].question}
        </Form.Label>

        <Answers
          questionType={this.state.currentQuestionType}
          answers={this.state.answers[i].options}
          answerUpdater={this.answerUpdater}
          key={i}
          belongsTo={i}
          optionRemover={this.optionRemover}
          selected={this.state.selected[i]}
        />
      </>
    ));
  }

  answerUpdater(event, ind) {
    console.log(event.target.value, ind, this.selected);
    let tmp = [...this.state.selected];
    if (this.state.answers[ind].options.length === 2)
      tmp[ind] = event.target.value;
    else if (Array.isArray(tmp[ind])) tmp[ind].push(event.target.value);
    else if (tmp.indexOf(event.target.value))
      tmp.splice(tmp.indexOf(event.target.value), 1);
    else {
      tmp[ind] = [];
      tmp.push(event.target.value);
    }
    this.setState({
      selected: [...tmp],
    });
  }

  optionRemover(event) {
    console.log(event.target.dataset.value);
    let ind = event.target.dataset.value.split("q");
    if (this.state.questions[ind[0]].qType == 2) return;
    let tmp = [...this.state.answers];
    tmp[ind[0]].options.splice(ind[1], 1);
    this.setState({
      answers: [...tmp],
    });
  }

  helper(qType) {
    let tmp = this.state;
    console.log("in heleper");
    if (this.questionType) {
      tmp.questions.push({
        formId: this.formId,
        qType,
        question: "",
        qNo: tmp.questions.length,
      });
      tmp.answers.push({
        qNo: tmp.questions.length,
        options: this.questionType == 1 ? [""] : ["yes", "no"],
        formId: this.formId,
      });
      this.setState({
        ...tmp,
      });
    }
  }
  render() {
    console.log(!this.state.currentQuestionType && "hai in ");
    console.log("current state", this.state);
    // !this.state.questions && this.apiCall();
    return <>{this.qAndans()}</>;
  }
}

export default TakeSurvey;
