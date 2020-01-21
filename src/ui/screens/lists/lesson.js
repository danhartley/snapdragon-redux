import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';

import lessonTemplate from 'ui/screens/lists/lesson-template.html';

export const renderLesson = (lesson) => {

      const { config, lessons, layout } = store.getState();

      const template = document.createElement('template');
            template.innerHTML = lessonTemplate;

      lesson.hideVideoClass = lesson.hasVideo ? '' : 'hide-important';

      const savedLesson = lessons.find(saved => saved.collection.id === lesson.id);

      lesson.isPaused = !!savedLesson || config.collection.id === lesson.id;

      renderTemplate({ lesson }, template.content, document.querySelector('.js-lesson-container'));

      if(!lesson.hasVideo) {
            const chevron = document.querySelector(`div.js-lesson-list-chevron[data-lesson-id="${lesson.id}"]`);
                  chevron.classList.remove('landscape');                                  
      }

      if(savedLesson) {
            renderReview(savedLesson.layout, savedLesson.collection);
      } else if(config.collection.id === lesson.id) {

            // current lesson whose current state is not yet saved
            if(layout && layout.roundScoreCount) {
                  renderReview(layout, lesson, 'progress-icon');
            }

            const row = document.querySelector(`.lesson-list-carousel-item[data-lesson-id="${lesson.id}"]`)
                  row.classList.add('review-summary');
      }
}; 

function renderReview(layout, lesson, className) {
      const review = `<progress value="${layout.roundProgressIndex || progressBar.value}" max="${layout.roundScoreCount}"></progress>
                      <i data-lesson-id="${lesson.id}" class="fas fa-tasks margin-left ${ className } js-review-summary"></i>`;
      const parent = document.querySelector(`.js-review[data-lesson-id="${lesson.id}"]`);
            parent.innerHTML = review;
}
