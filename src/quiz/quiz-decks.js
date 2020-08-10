import { renderTemplate } from 'quiz/templating';
import { enums } from 'ui/helpers/enum-helper';
import { actions } from 'redux/actions/action-creators';
import { logic } from 'quiz/quiz-logic';

import quizDecksTemplate from 'quiz/quiz-decks-template.html';

export const quizDecks = decks => {

  const template = document.createElement('template');
        template.innerHTML = quizDecksTemplate;

  const parent = document.querySelector('main');
        parent.innerHTML = '';

  renderTemplate({ decks }, template.content, parent);

  const handleDeckSelector = async e => {    
    actions.boundUpdateDeck(await logic.getDeck(e.target.dataset.name));
    actions.boundUpdateDeckState(enums.deckState.BEGIN);
  };

  document.querySelectorAll('.js-decks').forEach(deck => {
    deck.addEventListener('click', handleDeckSelector, { once: true });
  });

};