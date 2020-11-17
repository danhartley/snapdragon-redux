import { renderTemplate } from 'ui/helpers/templating';

import lessonHistoryTemplate from 'index-helpers/dashboard/lesson-quiz-history-template.html';

export const renderLessonQuizHistoryScores = history => {
  
  const template = document.createElement('template');
        template.innerHTML = lessonHistoryTemplate;

  const parent = document.querySelector('.js-lesson-quiz-history');
        if(!parent) return;
        parent.innerHTML = '';

  const context = {
    total: history ? history.total : 0,
    correct: history ? history.correct: 0
  }

  renderTemplate(context, template.content, parent);
};