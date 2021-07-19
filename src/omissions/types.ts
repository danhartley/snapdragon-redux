export const questions = [
  {
    answer: {
      value: ''
    },
    answers: [
      {
        value: ''
      }
    ],
    model: {
      name: ''
    }
  }
];

class Answer {
  value: string
}

class Question {
  constructor({answer, answers}) {
    answer = answer;
    answers = answers;
  }
}

export interface Model {
  name: string,
  question: Question,
  render(): void
}

const _question = new Question({answer: '', answers: [{answer:''}]});

class TextEntryModel implements Model {
  name: 'text entry';
  question: null;
  constructor({question}) {
    this.question = question;
  };
  render() {
    console.log(this.name);
  }
}

class MultipleChoiceModel implements Model {
  name: 'multiple choice';
  question: null;
  constructor({question}) {
    this.question = question;
  };
  render() {
    console.log(this.name);
  }
}

const myTextEntryModel = new TextEntryModel({ question: _question});
const myMultipleChoiceModel = new MultipleChoiceModel({ question: _question});

export const models = {
  TextEntryModel
}