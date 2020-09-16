import { renderTemplate } from 'ui/helpers/templating';

import lessonHistoryTemplate from 'index-helpers/dashboard/lesson-quiz-history-template.html';

export const renderLessonQuizHistoryScores = history => {
  
  const template = document.createElement('template');
        template.innerHTML = lessonHistoryTemplate;

  const parent = document.querySelector('.js-lesson-history');
        if(!parent) return;
        parent.innerHTML = '';

  const context = {
    total: history.total,
    correct: history.correct
  }

  renderTemplate(context, template.content, parent);
};