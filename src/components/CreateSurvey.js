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
    this.optionRemover = this.optionRemover.bind(this);
    this.addMoreQuestions = this.addMoreQuestions.bind(this);
  }

  componentDidMount() {
    return <QuestionType />;
  }

  selectedOption(event) {
    console.log(event);
    // let tmp = [...this.state.questions];
    this.questionType = event;
    this.setState(
      {
        currentQuestionType: true,
      },
      this.helper
    );
  }

  inputCounter(event) {
    console.log(event.target.dataset.value);
    let ind = event.target.dataset.value.split("q");
    let tmp = [...this.state.answers];
    tmp[ind[0]].options.splice(+ind[1] + 1, 0, "");
    this.setState({
      answers: [...tmp],
    });
  }

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
          optionRemover={this.optionRemover}
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
    let tmp = [...this.state.answers];
    let ind = event.target.name.split("q");
    tmp[ind[0]].options[ind[1]] = event.target.value;
    this.setState({
      answers: [...tmp],
    });
  }

  optionRemover(event) {
    console.log(event.target.dataset.value);
    let ind = event.target.dataset.value.split("q");
    let tmp = [...this.state.answers];
    tmp[ind[0]].options.splice(ind[1], 1);
    this.setState({
      answers: [...tmp],
    });
  }

  addMoreQuestions() {
    this.setState({
      currentQuestionType: false,
    });
  }

  helper() {
    let tmp = this.state;
    console.log("in heleper");
    if (this.questionType) {
      tmp.questions.push({
        formId: "",
        qType: "",
        question: "",
      });
      tmp.answers.push({
        qNo: "",
        options: this.questionType == 1 ? [""] : ["yes", "no"],
        formId: "",
      });
      this.setState({
        ...tmp,
      });
    }
  }
  render() {
    console.log(!this.state.currentQuestionType && "hai in ");
    console.log("current state", this.state);
    return (
      <>
        {!this.state.currentQuestionType && (
          <QuestionType
            onSelect={this.selectedOption}
            status={!this.state.currentQuestionType}
          />
        )}
        {this.qAndans()}
        <Button variant="primary" onClick={this.addMoreQuestions}>
          Add Question
        </Button>
        <Button variant="success">Publish</Button>
      </>
    );
  }
}

export default CreateSurvey;
