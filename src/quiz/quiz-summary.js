import { store } from 'redux/store';
import { renderTemplate } from 'quiz/templating';

import quizSummaryTemplate from 'quiz/quiz-summary-template.html';

export const quizSummary = decks => {

  const { deckScore, deckScoreHistory } = store.getState();

  const template = document.createElement('template');
        template.innerHTML = quizSummaryTemplate;

  const parent = document.querySelector('.js-quiz-bottom');

  if(!parent) return
  
  parent.innerHTML = '';

  renderTemplate({deckScoreHistory, deckScore}, template.content, parent);
};