import { store } from 'redux/store';
import { quickFire } from 'ui/quick-fire-modal/quick-fire';
import { quickFireUI } from 'ui/quick-fire-modal/quick-fire-ui';
import { renderTemplate } from 'ui/helpers/templating';

import glossaryTemplate from 'ui/fixtures/glossary-template.html';

export const renderGlossary = async glossary => {

      const template = document.createElement('template');
            template.innerHTML = glossaryTemplate;

      const modal = document.querySelector('#glossaryModal');

      const parent = modal.querySelector('.js-modal-text');
            parent.innerHTML = '';

      renderTemplate({ glossary }, template.content, parent);

      const onClickFiltersLink = e => {
            quickFire.filters(false);
      };
      const quickFireLink = modal.querySelector('.js-quick-fire-filters');
            quickFireLink.addEventListener('click', onClickFiltersLink, { once: true });

      const onClickQuestionsLink = e => {
            quickFire.questions({ ...store.getState().quickFire, linkFromLesson: false }, true);
            quickFireQuestionsLink.classList.add('hide-important');
      };
      const quickFireQuestionsLink = modal.querySelector('.js-quick-fire-questions');   
            quickFireQuestionsLink.addEventListener('click', onClickQuestionsLink, { once: true });

      const filtersLink = document.querySelector('.js-quick-fire-filters'); 
      
      quickFireUI.initGlossaryHeader(filtersLink);

};