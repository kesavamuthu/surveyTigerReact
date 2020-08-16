import React from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import QuestionType from "./QuestionType";
import QuestionMaker from "./QuestionMaker";
import Answers from "./answers";
import util from "../utility/utility";

class CreateSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        // {
        //   formId: 1,
        //   qType: true,
        //   question: "",
        // },
      ],
      answers: [
        // {
        //   qNo: 1,
        //   options: ["hello", "what"],
        //   formId: 1,
        // },
      ],
      currentQuestionType: "",
    };
    this.selectedOption = this.selectedOption.bind(this);
    this.inputCounter = this.inputCounter.bind(this);
    this.questionUpdater = this.questionUpdater.bind(this);
    this.answerUpdater = this.answerUpdater.bind(this);
    this.optionRemover = this.optionRemover.bind(this);
    this.addMoreQuestions = this.addMoreQuestions.bind(this);
    this.publish = this.publish.bind(this);
  }

  componentDidMount() {
    util
      .requestMaker({ uId: 1, name: "anonymous" }, "post", "create")
      .then((val) => {
        this.formId = val.data.id;
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
          console.log(ele);
          util
            .requestMaker(ele, "post", e === "questions" ? "set" : "setans")
            .then((res) => console.log)
            .catch((err) => {
              console.error(err);
            });
        });
    });
  }

  selectedOption(event) {
    console.log(event);
    if (isNaN(event)) {
      this.setState({
        currentQuestionType: true,
      });
      return;
    }
    this.questionType = event;
    this.setState(
      {
        currentQuestionType: true,
      },
      () => this.helper(event)
    );
  }

  inputCounter(event) {
    console.log(event.target.dataset.value);
    let ind = event.target.dataset.value.split("q");
    if (this.state.questions[ind[0]].qType == 2) return;
    if (this.state.answers[ind[0]].options.length >= 4) return;
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
          qValue={this.state.questions[i].question}
          questionUpdater={this.questionUpdater}
          name={i}
        />
        <Answers
          questionType={this.state.questions[i].qType}
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
    let value = event.target.value;
    let tmp = this.state.questions;
    tmp[+event.target.name].question = value;

    this.setState({
      questions: [...tmp],
    });
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
    if (this.state.questions[ind[0]].qType == 2) return;
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
        qNo: tmp.questions.length - 1,
        options: this.questionType == 1 ? [""] : ["yes", "no"],
        formId: this.formId,
      });
      this.setState({
        ...tmp,
      });
    }
  }
  render() {
    return (
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            {!this.state.currentQuestionType && (
              <QuestionType
                onSelect={this.selectedOption}
                status={!this.state.currentQuestionType}
              />
            )}
            {this.qAndans()}
            {this.state.questions.length && (
              <>
                <Button
                  variant="primary"
                  className="mr-5"
                  onClick={this.addMoreQuestions}
                >
                  Add Question
                </Button>
                <Button variant="success" onClick={this.publish}>
                  Publish
                </Button>
              </>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CreateSurvey;
