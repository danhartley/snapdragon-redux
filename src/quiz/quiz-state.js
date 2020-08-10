import { logic } from 'quiz/quiz-logic';
import { actions } from 'redux/actions/action-creators';
import { enums } from 'ui/helpers/enum-helper';
import { renderTemplate } from 'quiz/templating';

import beginTemplate from 'quiz/quiz-state-begin.html';
import scoreTemplate from 'quiz/quiz-state-score.html';

export const quizState = deckState => {

  const MINUTES = 5 * 60000;

  const template = document.createElement('template');

  switch(deckState) {
    case enums.deckState.BEGIN:
      template.innerHTML = beginTemplate;      
      break;
    case enums.deckState.SCORE:
      template.innerHTML = scoreTemplate;      
      break;
    default:
      template.innerHTML = beginTemplate;
  }

  const parent = document.querySelector('.js-state-container');
        parent.innerHTML = '';

  renderTemplate({}, template.content, parent);

  const begin = document.querySelector('.js-begin');
  const scoreCard = document.querySelector('.js-score-card');
  const clock = document.querySelector('.js-clock');

  switch(deckState.name) {
    case enums.deckState.BEGIN.name:
      begin.addEventListener('click', e => {
        document.querySelector('.answers').classList.remove('disabled');
        actions.boundUpdateDeckState(enums.deckState.SCORE);
      });   
      break;
    case enums.deckState.SCORE.name:
      const endTime = new Date(Date.now() + MINUTES);
      logic.initialiseClock(clock, endTime);
      break;
  }
  

};

export const quizScore = deckScore => {

  const score = document.querySelector('.js-deck-score');

  if(!score) return;

  score.innerHTML = `${deckScore.correct}/${deckScore.total}`;

  console.log(deckScore)
};