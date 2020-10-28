import { renderTemplate } from 'quiz/templating';
import { store } from 'redux/store';

import flashCardsTemplate from 'flashcards/flashcard-lesson-template.html';

export const renderFashcards = parent => {

    let template = document.createElement('template');
        template.innerHTML = flashCardsTemplate;

    renderTemplate({}, template.content, parent);

    let btn = document.querySelector('.js-flashcards');    
        btn.addEventListener('click', async e => {
          import('flashcards/flashcards-logic').then(module => {
            module.flashcardsLogic(store.getState().config, document.querySelector('.js-modal-text'));
          });
        });
};