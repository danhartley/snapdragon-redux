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
      } 
      
      if(config.collection.id === lesson.id) {

            const row = document.querySelector(`.js-lesson-list-carousel-item[data-lesson-id="${lesson.id}"]`)
                  row.classList.add('review-summary');

            if(config.isLandscapeMode) {
                  setTimeout(() => {
                        const reviewLink = row.querySelector('.js-review-summary');                  
                        if(reviewLink) reviewLink.click();
                  });
            }

            // current lesson whose current state is not yet saved
            if(layout && layout.roundScoreCount) {
                  renderReview(layout, lesson, 'progress-icon');
            }
      }
}; 

function renderReview(layout, lesson, className) {
      const progressBar = document.querySelector('.js-right-grid progress');
      const value = !!layout.roundProgressIndex ? layout.roundProgressIndex : progressBar ? progressBar.value : 0;
      const review = `<progress class="margin-right" value="${ value }" max="${layout.roundScoreCount}"></progress>
                        <span data-lesson-id="${lesson.id}" class="underline-link ${ className } js-review-summary">Review summary</span>`;
      const parent = document.querySelector(`.js-review[data-lesson-id="${lesson.id}"]`);
            parent.innerHTML = review;
}
