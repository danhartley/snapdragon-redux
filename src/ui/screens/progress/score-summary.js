import * as R from 'ramda';

import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { renderTemplate } from 'ui/helpers/templating';

import summaryTemplate from 'ui/screens/progress/score-summary-template.html';
import summaryRowTemplate from 'ui/screens/progress/score-summary-row-template.html';

export const renderScoreSummary = () => {

      const template = document.createElement('template');
            template.innerHTML = summaryTemplate;

      const parent = DOM.rightBody;
            parent.innerHTML = '';
      
      renderTemplate({ collection: store.getState().collection }, template.content, parent);

      const scores  = store.getState().history ? store.getState().history.scores : [ store.getState().score ];

      scores.forEach( score => renderScoreSummaryRow(score));
}

export const renderScoreSummaryRow = score => {
    
      const template = document.createElement('template');
            template.innerHTML = summaryRowTemplate;

      const parent = document.querySelector('.js-score-summary-rows');

      let rows = [ ...score.passes, ...score.fails ];

      rows = rows.map((r,i) => {
            return { ...r, id: `${i}${utils.toCamelCase(r.binomial)}`, question: r.question.term ? r.question.term : r.question, answers: r.answers.map(a => {
                  const answer = { 
                              value: typeof a === 'object' ? a.value : a, 
                              url: typeof a === 'object' ? a.url : '', 
                              hasImage: typeof a === 'object',
                              isTrue: utils.parseToLowerCase(a) === utils.parseToLowerCase(r.question) 
                                    || utils.parseToLowerCase(a.value) === utils.parseToLowerCase(r.question) 
                                    || utils.parseToLowerCase(a) === utils.parseToLowerCase(r.question.term)
                                    || R.contains(a.value, r.answer)
                        };
                        answer.isWrongAnswer = !answer.isTrue && utils.parseToLowerCase(answer.value) === utils.parseToLowerCase(r.answer);
                  return answer;
            })};
      });

      renderTemplate({ vernacularName: score.vernacularName, binomial: score.binomial, rows }, template.content, parent);
};