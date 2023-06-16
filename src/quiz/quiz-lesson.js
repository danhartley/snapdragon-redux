import { store } from 'redux/store';
import { renderTemplate } from 'quiz/templating';
import { actions } from 'redux/actions/action-creators';

import quizLessonTemplate from 'quiz/quiz-lesson-template.html';

export const renderLessonQuiz = parent => {

    const template = document.createElement('template');
          
    template.innerHTML = quizLessonTemplate;

    renderTemplate({}, template.content, parent);

    const { config } = store.getState();

    /**
     * Portrait: opens in a modal
     * Landscape: opens on the LHS
     */
    const btn = config.isLandscapeMode 
      ? document.querySelector('.js-quiz-landscape')
      : document.querySelector('.js-quiz-portrait');

    btn.addEventListener('click', async e => {
      import('quiz/quiz-modal').then(module => {
        module.openQuiz();
        actions.boundClearDeckScoreHistory();
      });
    });
};