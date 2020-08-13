import { store } from 'redux/store';
import { renderTemplate } from 'quiz/templating';
import { actions } from 'redux/actions/action-creators';

import quizSettingsTemplate from 'quiz/quiz-settings-template.html';

export const quizSettings = decks => {

  const { deckSettings } = store.getState();

  const template = document.createElement('template');
        template.innerHTML = quizSettingsTemplate;

  const parent = document.querySelector('.js-quiz-settings');
        parent.innerHTML = '';

  renderTemplate({}, template.content, parent);

  document.querySelectorAll('.names input').forEach(r => {
    if(r.id === deckSettings.name) r.checked = true;
    r.addEventListener('click', e => {
      actions.boundUpdateDeckSettings({ name: e.target.id } );
    });
  });

  document.querySelectorAll('.languages input').forEach(r => {
    if(r.id === deckSettings.language) r.checked = true;
    r.addEventListener('click', e => {
      actions.boundUpdateDeckSettings({ language: e.target.id });
    });
  });

};