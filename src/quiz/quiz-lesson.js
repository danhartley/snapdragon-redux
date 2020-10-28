import { renderTemplate } from 'quiz/templating';
import { actions } from 'redux/actions/action-creators';

import quizLessonTemplate from 'quiz/quiz-lesson-template.html';

export const renderLessonQuiz = parent => {

    let template = document.createElement('template');
        template.innerHTML = quizLessonTemplate;

    renderTemplate({}, template.content, parent);

    let btn = document.querySelector('.js-quiz');    
        btn.addEventListener('click', async e => {
          import('quiz/quiz-modal').then(module => {
            module.openQuiz();
            actions.boundClearDeckScoreHistory();
          });
        });
};