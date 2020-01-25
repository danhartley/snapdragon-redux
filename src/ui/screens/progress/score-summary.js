import * as R from 'ramda';

import { subscription } from 'redux/subscriptions';
import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { enums } from 'ui/helpers/enum-helper';
import { renderTemplate } from 'ui/helpers/templating';
import { lessonHandler } from 'ui/helpers/lesson-handler';

import summaryTemplate from 'ui/screens/progress/score-summary-template.html';
import summaryRowTemplate from 'ui/screens/progress/score-summary-row-template.html';

export const renderScoreSummary = (id, endOfRound) => {

      const collection = id 
                  ? store.getState().collections.find(c => c.id === parseInt(id)) 
                  : store.getState().collection;

      const { history, score } = store.getState();

      const template = document.createElement('template');
            template.innerHTML = summaryTemplate;

      const parent = DOM.rightBody;
            parent.innerHTML = '';
      
      renderTemplate({ collection }, template.content, parent);

      const scores  = endOfRound
            ? [ history.scores[history.scores.length - 1] ]
            : history 
                  ? [ ...history.scores, score ] 
                  : [ score ];

      scores.forEach( score => renderScoreSummaryRow(score));

      const handleBtnClickEvent = event => {

            const { lesson, config, history } = store.getState();
    
            lessonHandler.changeState(enums.lessonState.NEXT_ROUND, collection, config, history);

            subscription.remove(subscription.getByName('renderSummary'));
            subscription.remove(subscription.getByName('renderHistory'));
    
            if(lesson.isLessonComplete) {
                lessonHandler.purgeLesson();
            }
            else lessonHandler.changeState(enums.lessonState.NEXT_ROUND, collection, config, history);
        };

        const actionLinks = document.querySelectorAll('.js-continue-link');

        actionLinks.forEach(actionLink => {
            actionLink.removeEventListener('click', handleBtnClickEvent);
            actionLink.addEventListener('click', handleBtnClickEvent);
        });
}

const renderScoreSummaryRow = score => {
    
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