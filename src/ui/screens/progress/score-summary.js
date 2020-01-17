import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { renderTemplate } from 'ui/helpers/templating';

import summaryTemplate from 'ui/screens/progress/score-summary.html';

export const renderScoreSummary = () => {
    
    const { lessons, history, score } = store.getState();

    let rows = [ ...score.passes, ...score.fails ];

    rows = rows.map((r,i) => {
          return { ...r, id: `${i}${utils.toCamelCase(r.binomial)}`, question: r.question.term ? r.question.term : r.question, answers: r.answers.map(a => {
                  const answer = { value: a, isTrue: a === r.question || a === r.question.term  };
                        answer.isWrongAnswer = !answer.isTrue && answer.value === r.answer;
                  return answer;
          })};
    });

    // groupby itemId
    // sortBy index asc

    const template = document.createElement('template');
          template.innerHTML = summaryTemplate;
      
    const parent = DOM.rightBody;
          parent.innerHTML = '';

    renderTemplate({ rows }, template.content, parent);
};