import { store } from 'redux/store';
import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';

import lessonScoresTemplate from 'index-helpers/dashboard/lesson-quiz-template.html';

export const renderLessonQuizScores = score => {

  const { history } = store.getState();

  score = itemProperties.getLatestScore(history, score);
  
  const template = document.createElement('template');
        template.innerHTML = lessonScoresTemplate;

  const parent = document.querySelector('.js-lesson-quiz');
        if(!parent) return;
        parent.innerHTML = '';

  const context = {
    total: score.total,
    correct: score.correct
  }

  renderTemplate(context, template.content, parent);
};