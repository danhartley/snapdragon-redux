import { renderTemplate } from 'ui/helpers/templating';

import vocabTestTemplate from 'index-helpers/dashboard/vocab-test-template.html';

export const renderVocabtestScore = quickFire => {

  const template = document.createElement('template');
        template.innerHTML = vocabTestTemplate;

  const parent = document.querySelector('.js-vocab-tests');
        if(!parent) return;
        parent.innerHTML = '';

  const context = {
    total: quickFire.termScore.total,
    correct: quickFire.termScore.correct
  }

  renderTemplate(context, template.content, parent);

};