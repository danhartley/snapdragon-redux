import { itemProperties } from 'ui/helpers/data-checking';
import { subscription } from 'redux/subscriptions';
import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { renderTemplate } from 'ui/helpers/templating';
import { lessonStateHandler } from 'ui/screens/lists/lesson-state-handler';
import { scoreSummaryHandler } from 'ui/screens/progress/score-summary-handler';

import summaryTemplate from 'ui/screens/progress/score-summary-template.html';
import summaryRowTemplate from 'ui/screens/progress/score-summary-row-template.html';

export const renderScoreSummary = async (collectionId) => {

      const { lessons, score } = store.getState();
      
      const { collection, history, lesson, config, score: savedScore } = lessons.length > 0
                  ? !!lessons.find(l => l.collection.id === parseInt(collectionId))
                        ? lessons.find(l => l.collection.id === parseInt(collectionId))
                        : store.getState()
                  : store.getState();

      const template = document.createElement('template');
            template.innerHTML = summaryTemplate;

      const parent = DOM.rightBody;
            parent.innerHTML = '';
      
      renderTemplate({ collection }, template.content, parent);

      let scores = scoreSummaryHandler.getLessonScores(history, lesson, score, savedScore);

      scores.forEach(s => renderScoreSummaryRow(s, config));

      const handleBtnClickEvent = async event => {
            
            subscription.remove(subscription.getByName('renderSummary'));
            subscription.remove(subscription.getByName('renderHistory'));      
    
            if(lesson.isLessonComplete) {
                  await lessonStateHandler.purgeLesson();
            } else {
                  lessonStateHandler.beginOrResumeLesson(collectionId, store.getState().lesson.isNextRound);
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
          rows = scoreSummaryHandler.getSummaryRows(rows);

      const vernacularName = score.vernacularName || itemProperties.getVernacularName(score.binomial, config);

      renderTemplate({ vernacularName, binomial: score.binomial, rows }, template.content, parent);
};
