import { renderTemplate } from 'ui/helpers/templating';

import vocabTestHistoryTemplate from 'index-helpers/dashboard/vocab-test-history-template.html';

export const renderVocabTestHistoryScore = quickFireHistory => {

  const template = document.createElement('template');
        template.innerHTML = vocabTestHistoryTemplate;

  const parent = document.querySelector('.js-vocab-history-tests');
        if(!parent) return;
        parent.innerHTML = '';

  const context = {
    total: quickFireHistory.total,
    correct: quickFireHistory.correct
  }

  renderTemplate(context, template.content, parent);

};