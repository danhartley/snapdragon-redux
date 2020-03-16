import { quickFire } from 'ui/quick-fire-modal/quick-fire';
import { renderTemplate } from 'ui/helpers/templating';

import glossaryTemplate from 'ui/fixtures/glossary-template.html';

export const renderGlossary = async glossary => {

  const template = document.createElement('template');
        template.innerHTML = glossaryTemplate;

  const modal = document.querySelector('#glossaryModal');
        modal.querySelector('.js-modal-text-title').innerHTML = 'Glossary';

  const parent = modal.querySelector('.js-modal-text');
        parent.innerHTML = '';

  renderTemplate({ glossary }, template.content, parent);

  const quickFireLink = modal.querySelector('.js-quick-fire');
        quickFireLink.addEventListener('click', e => {
          quickFire.review(glossary);
        });
};