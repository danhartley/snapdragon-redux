import { enums } from 'ui/helpers/enum-helper';
import { itemProperties } from 'ui/helpers/data-checking';
import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { renderTemplate } from 'ui/helpers/templating';
import { lessonStateHandler } from 'ui/screens/lists/lesson-state-handler';
import { lessonStateHelper } from 'ui/screens/lists/lesson-state-helper';
import { scoreSummaryHandler } from 'ui/screens/progress/score-summary-handler';

import summaryTemplate from 'ui/screens/progress/score-summary-template.html';
import summaryRowTemplate from 'ui/screens/progress/score-summary-row-template.html';
import summaryNoRowTemplate from 'ui/screens/progress/score-summary-no-row-template.html';

export const renderScoreSummary = (lessonId, summaryContainer) => {

      const init = () => {

            const { lessons, score: stateScore, userAction } = store.getState();

            const { collection, history, config, score: savedScore } = lessons.length > 0
                        ? !!lessons.find(l => l.collection.id === parseInt(lessonId))
                              ? lessons.find(l => l.collection.id === parseInt(lessonId))
                              : store.getState()
                        : store.getState();
      
            const { lesson } = store.getState();
      
            if(lessonStateHelper.overrideLesson(userAction, config)) { return; }
      
            const template = document.createElement('template');
                  template.innerHTML = summaryTemplate;
      
            const parent = config.isLandscapeMode
                        ? summaryContainer || document.querySelector('#lessonModal .js-modal-text')
                        : DOM.rightBody ;
                  parent.innerHTML = '';
            
            renderTemplate({ collection }, template.content, parent);

            const actionLinks = document.querySelectorAll('.js-continue-link');

            if(summaryContainer) {
                  actionLinks.forEach(link => link.classList.add('hide-important'));
            }
            
            let scores = scoreSummaryHandler.getLessonScores(history, lesson, stateScore, savedScore).reverse();
                scores.forEach(s => renderScoreSummaryRow(scores, s, config));
      
            const handleContinueLesson = async event => {            
                  console.log('Summary continue lesson request');
                  lessonStateHandler.changeRequest({
                        requestType: enums.lessonState.NEXT_ROUND,
                        requestArgs: {
                          id: lessonId,
                          lesson: { ...lesson, isNextRound: true }
                        }
                      });
            };
      
            const handleNewLesson = async event => {                   
                  await lessonStateHelper.purgeLesson();
            };
      
            if(lesson.isLessonComplete) {
                  actionLinks.forEach(actionLink => {
                        actionLink.innerHTML = 'START NEW LESSON';
                        actionLink.addEventListener('click', handleNewLesson, { once: true });
                  });
            } else {
                  actionLinks.forEach(actionLink => {
                        actionLink.addEventListener('click', handleContinueLesson, { once: true });
                  });
            }
      };

      init();
}

const renderScoreSummaryRow = (scores, s, config) => {
    
      const template = document.createElement('template');
            template.innerHTML = summaryRowTemplate;

      const parent = document.querySelector('.js-score-summary-rows');
            
      if(s.total === 0) {
            parent.innerHTML = '';
            template.innerHTML = summaryNoRowTemplate;            
            renderTemplate({ }, template.content, parent);
            return;
      }
      let rows = [ ...s.passes, ...s.fails ];
          rows = scoreSummaryHandler.getSummaryRows(rows);          

      const vernacularName = s.vernacularName || itemProperties.getVernacularName(s.binomial, config);

      renderTemplate({ vernacularName, binomial: s.binomial, rows }, template.content, parent);

      if(scores.length > 0) {
            const noQuestionsText = parent.querySelector('.js-no-questions');                  
            if(noQuestionsText) {
                  noQuestionsText.innerHTML = '';
            }
      }
};