import { store } from 'redux/store';
import { renderTemplate } from 'quiz/templating';

import quizSummaryTemplate from 'quiz/quiz-summary-template.html';

export const quizSummary = decks => {

  const { deckScoreHistory } = store.getState();

  const template = document.createElement('template');
        template.innerHTML = quizSummaryTemplate;

  const parent = document.querySelector('.js-quiz-bottom');
        parent.innerHTML = '';

  renderTemplate({deckScoreHistory}, template.content, parent);
};