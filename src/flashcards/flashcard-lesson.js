import { renderTemplate } from 'quiz/templating';
import { store } from 'redux/store';

import flashCardsTemplate from 'flashcards/flashcard-lesson-template.html';

export const renderFashcards = parent => {
  
    let template = document.createElement('template');
        template.innerHTML = flashCardsTemplate;

    renderTemplate({}, template.content, parent);

    const { config } = store.getState();

    /**
     * Portrait: opens in a modal
     * Landscape: opens on the LHS
     */
    const btn = config.isLandscapeMode 
      ? document.querySelector('.js-flashcards-landscape')
      : document.querySelector('.js-flashcards-portrait');
        
        btn.addEventListener('click', async e => {
          import('flashcards/flashcards-logic').then(module => {
            module.flashcardsLogic(store.getState().config);
          });
        });
};