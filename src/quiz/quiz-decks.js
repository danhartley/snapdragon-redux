import { renderTemplate } from 'quiz/templating';
import { store } from 'redux/store';
import { enums } from 'ui/helpers/enum-helper';
import { actions } from 'redux/actions/action-creators';
import { logic } from 'quiz/quiz-logic';
import { quizConfig } from 'quiz/quiz-config';

import quizDecksTemplate from 'quiz/quiz-decks-template.html';

export const quizDecks = decks => {

  // document.querySelector('.quiz .js-quiz-header').innerText = 'Species recognition';

  let template = document.createElement('template');
      template.innerHTML = quizDecksTemplate;

  let parent = document.querySelector('.js-quiz-top');

  if(!parent) return

  parent.innerHTML = '';
  
  renderTemplate({ decks: decks.filter(deck => deck.count > 0) }, template.content, parent);

  const handleDeckSelector = async e => {

    const { deckSettings } = store.getState();

    actions.boundUpdateDeck(await logic.getQuizDeck(e.target.dataset.name, quizConfig.QUESTIONS_PER_SPECIES, deckSettings.language));
    actions.boundUpdateDeckState(enums.deckState.BEGIN);
  };

  document.querySelectorAll('.js-decks').forEach(deck => {
    deck.addEventListener('click', handleDeckSelector, { once: true });
  });
};