import * as R from 'ramda';

import { itemProperties } from 'ui/helpers/data-checking';
import { subscription } from 'redux/subscriptions';
import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { renderTemplate } from 'ui/helpers/templating';
import { lessonStateHandler } from 'ui/screens/lists/lesson-state-handler';

import summaryTemplate from 'ui/screens/progress/score-summary-template.html';
import summaryRowTemplate from 'ui/screens/progress/score-summary-row-template.html';

export const renderScoreSummary = async (collectionId, endOfRound) => {

      const { lessons } = store.getState();
      
      const { collection, score, history, lesson, config } = lessons.find(l => l.collection.id === parseInt(collectionId));

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

      scores.forEach(s => renderScoreSummaryRow(s, config));

      const handleBtnClickEvent = async event => {
    
            subscription.remove(subscription.getByName('renderSummary'));
            subscription.remove(subscription.getByName('renderHistory'));
    
            if(lesson.isLessonComplete) {
                  await lessonStateHandler.purgeLesson();
            } else {
                  lessonStateHandler.beginOrResumeLesson(collectionId);
            }            
        };

        const actionLinks = document.querySelectorAll('.js-continue-link');

        actionLinks.forEach(actionLink => {
            actionLink.removeEventListener('click', handleBtnClickEvent);
            actionLink.addEventListener('click', handleBtnClickEvent);
        });
}

const renderScoreSummaryRow = (score, config) => {
    
      const template = document.createElement('template');
            template.innerHTML = summaryRowTemplate;

      const parent = document.querySelector('.js-score-summary-rows');

      let rows = [ ...score.passes, ...score.fails ];

      rows = rows.map((r,i) => {
            return { ...r, id: `${i}${utils.toCamelCase(r.binomial)}`, question: r.question.term ? r.question.term : r.question, answers: r.answers.map(a => {
                  const _answer = { 
                              value: typeof a === 'object' ? a.value : a, 
                              url: typeof a === 'object' ? a.url : '', 
                              hasImage: typeof a === 'object',
                              isTrue: a !== "" && (utils.parseToLowerCase(a) === utils.parseToLowerCase(r.question) 
                                                || utils.parseToLowerCase(a.value) === utils.parseToLowerCase(r.question) 
                                                || utils.parseToLowerCase(a) === utils.parseToLowerCase(r.question.term)
                                                || R.contains(a.value, r.answer))
                        };
                        _answer.isWrongAnswer = !_answer.isTrue && utils.parseToLowerCase(_answer.value) === utils.parseToLowerCase(r.answer);
                  return _answer;
            })};
      });

      const vernacularName = score.vernacularName || itemProperties.getVernacularName(score.binomial, config);

      renderTemplate({ vernacularName, binomial: score.binomial, rows }, template.content, parent);
};