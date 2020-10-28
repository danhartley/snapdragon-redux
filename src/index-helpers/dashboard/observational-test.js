import { renderTemplate } from 'ui/helpers/templating';

import observationalTestTemplate from 'index-helpers/dashboard/observational-test-template.html';

export const renderDeckScore = deckScore => {
  
  const template = document.createElement('template');
        template.innerHTML = observationalTestTemplate;

  const parent = document.querySelector('.js-observational-test');
        if(!parent) return;
        parent.innerHTML = '';

const context = {
  total: deckScore.total,
  correct: deckScore.correct
}

renderTemplate(context, template.content, parent);

};