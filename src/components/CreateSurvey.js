import React from "react";
import { Card, Button } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import QuestionType from "./QuestionType";
import QuestionMaker from "./QuestionMaker";
import Answers from "./answers";

class CreateSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {
          formId: "",
          qType: "",
          question: "",
        },
      ],
      answers: [
        {
          qNo: "",
          options: ["hello", "what"],
          formId: "",
        },
      ],
      currentQuestionType: "",
    };
    this.selectedOption = this.selectedOption.bind(this);
    this.inputCounter = this.inputCounter.bind(this);
    this.questionUpdater = this.questionUpdater.bind(this);
    this.answerUpdater = this.answerUpdater.bind(this);
  }

  componentDidMount() {
    return <QuestionType />;
  }

  selectedOption(event) {
    console.log(event);
    this.setState({
      currentQuestionType: event == 1,
    });
  }

  inputCounter() {}

  qAndans() {
    return this.state.questions.map((e, i) => (
      <>
        <QuestionMaker
          questionType={this.state.currentQuestionType}
          qValue={this.state.questions[i].question}
          questionUpdater={this.questionUpdater}
          name={i}
        />
        <Answers
          questionType={this.state.currentQuestionType}
          answers={this.state.answers[i].options}
          inputCounter={this.inputCounter}
          answerUpdater={this.answerUpdater}
          key={i}
          belongsTo={i}
        />
      </>
    ));
  }

  questionUpdater(event) {
    console.log(event.target.value, event.target.name);
    let value = event.target.value;
    let tmp = this.state.questions;
    tmp[+event.target.name].question = value;

    this.setState({
      questions: [...tmp],
    });
    console.log(this.state);
  }

  answerUpdater(event) {
    let tmp = this.state.answers;
    let ind = event.target.name.split("q");
    tmp[ind[0]].options[ind[1]] = event.target.value;
    this.setState({
      answers: [...tmp],
    });
  }

  render() {
    console.log("hai in ");
    return (
      <>
        {!this.state.currentQuestionType ? (
          <QuestionType onSelect={this.selectedOption} status={true} />
        ) : (
          <>{this.qAndans()}</>
        )}
      </>
    );
  }
}

export default CreateSurvey;
