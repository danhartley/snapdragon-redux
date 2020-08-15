import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { logic } from 'quiz/quiz-logic';
import { enums } from 'ui/helpers/enum-helper';
import { renderTemplate } from 'quiz/templating';

import beginTemplate from 'quiz/quiz-state-begin.html';
import scoreTemplate from 'quiz/quiz-state-score.html';
import { quizConfig } from 'quiz/quiz-config';

export const quizState = deckState => {

  const { decks, deck } = store.getState();

  const seconds = quizConfig.TIME_PER_QUESTION * deck.cards.length * quizConfig.QUESTIONS_PER_SPECIES;
  const milliseconds = seconds * 1000;

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

  const parent = document.querySelector('.js-quiz-bottom');
        parent.innerHTML = '';

  renderTemplate({ time: logic.convertSecondsToClockTime(seconds), remaining: deck.cards.length }, template.content, parent);

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
  
  document.querySelector('.js-quiz-back').addEventListener('click', e => {
    actions.boundUpdateDeckState(enums.deckState.BEGIN);
    actions.boundUpdateDecks([ ...decks.filter(deck => deck.count > 0), { name: `${new Date().getTime()}`, count: 0 } ]);
  });

};

export const quizScore = deckScore => {

  const { deck } = store.getState();

  const score = document.querySelector('.js-deck-score');
  const remaining = document.querySelector('.js-deck-remaining');

  if(!score) return;

  score.innerHTML = `${deckScore.correct}/${deckScore.total}`;
  remaining.innerHTML = deck.cards.length - deckScore.total;
};