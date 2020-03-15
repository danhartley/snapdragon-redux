import { DOM } from 'ui/dom';
import { quickFire } from 'ui/quick-fire-modal/quick-fire';
import { renderTemplate } from 'ui/helpers/templating';

import glossaryTemplate from 'ui/fixtures/glossary-template.html';

export const renderGlossary = async glossary => {

    const template = document.createElement('template');
          template.innerHTML = glossaryTemplate;

    DOM.modalText.innerHTML = '';
    DOM.modalTextTitle.innerHTML = 'Glossary';

    renderTemplate({ glossary }, template.content, DOM.modalText);

    const headerBlock = document.querySelector('#basicModal .js-modal-header-block');
    const quickFireLink = headerBlock.querySelector(':nth-child(2)');
          quickFireLink.innerHTML = `
            <div class="uppercase double-margin-right small-text">
              <span class="hide-important underline-link js-quick-fire-filters">Quick-fire filters</span>
              <span class="underline-link margin-left js-quick-fire-review">Quick-fire review</span>
            </div>`;
          quickFireLink.addEventListener('click', e => {
            quickFire.review();
          });
};