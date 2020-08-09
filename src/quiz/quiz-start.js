import { renderTemplate } from 'quiz/templating';
import { subscription } from 'redux/subscriptions'; 
import { actions } from 'redux/actions/action-creators';
import { logic } from 'quiz/quiz-logic';
import { quizDeck } from 'quiz/quiz-deck';

import quizStartTemplate from 'quiz/quiz-start-template.html';

export const quizStart = decks => {

  const template = document.createElement('template');
        template.innerHTML = quizStartTemplate;

  const parent = document.querySelector('main');
        parent.innerHTML = '';

  renderTemplate({ decks }, template.content, parent);

  document.querySelectorAll('.js-deck-names').forEach(deck => {
    deck.addEventListener('click', async e => {
      subscription.add(quizDeck, 'deck', 'modal');
      actions.boundUpdateDeck(await logic.getDeck(e.target.dataset.name));
    }, { once: true} );
  });
};