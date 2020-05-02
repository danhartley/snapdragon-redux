import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';

import lessonTemplate from 'ui/screens/lists/lesson-template.html';

export const renderLesson = (lesson) => {

      const { config, lessons, layout } = store.getState();

      const template = document.createElement('template');
            template.innerHTML = lessonTemplate;

      lesson.hideVideoClass = lesson.hasVideo ? '' : 'hide-important';
      lesson.hideTextIntroClass = lesson.hasVideo ? 'hide-important' : '';

      const savedLesson = lessons.find(saved => saved.collection.id === lesson.id);

      lesson.isPaused = !!savedLesson || config.collection.id === lesson.id;
      lesson.icon = lesson.icon || "https://static.inaturalist.org/photos/57604885/small.jpeg?1575746307";

      renderTemplate({ lesson }, template.content, document.querySelector('.js-lesson-container'));

      if(savedLesson) {
            renderReview(savedLesson.layout, savedLesson.collection, null, config);
      } 
      
      if(config.collection.id === lesson.id) {

            const row = document.querySelector(`.js-lesson-list-carousel-item[data-lesson-id="${lesson.id}"]`)
                  if(row) row.classList.add('highlighted-for-review-row');

            if(config.isLandscapeMode) {
                  setTimeout(() => {
                        const reviewLink = row.querySelector('.js-review-summary');                  
                        if(reviewLink) reviewLink.click();
                  });
            }

            // current lesson whose current state is not yet saved
            if(layout && layout.roundScoreCount) {
                  renderReview(layout, lesson, 'progress-icon', config);
            }
      }
}; 

const renderReview = (layout, lesson, className, config) => {
      // const text = config.isLandscapeMode ? 'Quiz progress' : 'Quiz progress';
      const progressBar = document.querySelector('.js-right-grid progress');
      const value = !!layout.roundProgressIndex ? layout.roundProgressIndex : progressBar ? progressBar.value : 0;
      const review = `<progress class="margin-right" value="${ value }" max="${layout.roundScoreCount}"></progress>`;
      // const review = config.isLandscapeMode 
      //                   ? `<progress class="margin-right" value="${ value }" max="${layout.roundScoreCount}"></progress>
      //                     <span data-toggle="modal" data-target="#lessonModal" data-lesson-id="${lesson.id}" class="underline-link ${ className } js-review-summary">${ text }</span>`
      //                   : `<progress class="margin-right" value="${ value }" max="${layout.roundScoreCount}"></progress>
      //                     <span data-lesson-id="${lesson.id}" class="underline-link ${ className } js-review-summary">${ text }</span>`;
      const parent = document.querySelector(`.js-review[data-lesson-id="${lesson.id}"]`);
            parent.innerHTML = review;
};
