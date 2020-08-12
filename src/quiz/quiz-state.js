import { store } from 'redux/store';
import { logic } from 'quiz/quiz-logic';
import { enums } from 'ui/helpers/enum-helper';
import { renderTemplate } from 'quiz/templating';

import beginTemplate from 'quiz/quiz-state-begin.html';
import scoreTemplate from 'quiz/quiz-state-score.html';

export const quizState = deckState => {

  const { deck } = store.getState();

  const TIME_PER_QUESTION = 5;

  const milliseconds = TIME_PER_QUESTION * deck.cards.length * 1000;

  const template = document.createElement('template');

  switch(deckState) {
    case enums.deckState.BEGIN:
      template.innerHTML = beginTemplate;      
      break;
    case enums.deckState.SCORE:
      template.innerHTML = scoreTemplate;      
      break;
    default:
      template.innerHTML = scoreTemplate;
  }

  const parent = document.querySelector('.js-state-container');
        parent.innerHTML = '';

  renderTemplate({ time: `${deck.time || 5}:00` }, template.content, parent);

  const clock = document.querySelector('.js-clock');

  switch(deckState.name) {
    case enums.deckState.BEGIN.name:   
      break;
    case enums.deckState.SCORE.name:
      const endTime = new Date(Date.now() + milliseconds);
      logic.initialiseClock(clock, endTime);
      break;
    case enums.deckState.END.name:
      clock.innerHTML = logic.resetClock();
      break;
  }
  

};

export const quizScore = deckScore => {

  const { deck } = store.getState();

  const score = document.querySelector('.js-deck-score');
  const remaining = document.querySelector('.js-deck-remaining');

  if(!score) return;

  score.innerHTML = `${deckScore.correct}/${deckScore.total}`;
  remaining.innerHTML = deck.cards.length - deckScore.total;
};