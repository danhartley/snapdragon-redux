import { renderTemplate } from 'ui/helpers/templating';

import vocabTestTemplate from 'index-helpers/dashboard/vocab-test-template.html';

export const renderVocabTestScore = quickFire => {

  const template = document.createElement('template');
        template.innerHTML = vocabTestTemplate;

  const parent = document.querySelector('.js-vocab-tests');
        if(!parent) return;
        parent.innerHTML = '';

  const context = quickFire ? {
    total: quickFire.termScore ? quickFire.termScore.total : 0,
    correct: quickFire.termScore ? quickFire.termScore.correct : 0
  } : {
    total: 0, correct: 0
  }

  renderTemplate(context, template.content, parent);

};