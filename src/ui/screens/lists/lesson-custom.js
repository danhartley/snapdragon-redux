import { onCreateCustomLesson } from 'ui/create-guide-modal/create-guide';
import { renderTemplate } from 'ui/helpers/templating';
import { lessonListEventHandler } from 'ui/screens/lists/lesson-list-event-handler';

import lessonTemplate from 'ui/screens/lists/lesson-template.html';

export const renderCustomLesson = (lessons, videoPlayer, config) => {

    onCreateCustomLesson(collection => {

        const parent = document.querySelector('.lesson-list > .scrollable');
        const template = document.createElement('template');
              template.innerHTML = lessonTemplate;
        
        const lesson = lessonListEventHandler.onLoadLessonViewState(collection, videoPlayer);
              lesson.hideVideoClass = 'hide-important';
              lesson.hideTextIntroClass = '';
        
        lessons.push(lesson);
        
        lesson.icon = lesson.icon || "https://static.inaturalist.org/photos/57604885/small.jpeg?1575746307";

        renderTemplate({ lesson }, template.content, parent);
        
        const scrollOptions = {
          left: 0,
          top: 1000,
          behavior: 'smooth'
        }
        
        // const title = document.querySelector(`.js-lesson-title[data-lesson-id="${lesson.id}"]`);
        // lessonListEventHandler.onLessonTitleClickHandler(title, lessons);

        setTimeout(() => {

          document.querySelector('.js-lesson-container').scrollTo(scrollOptions);

          const reviewLink = document.querySelector(`.js-review-link[data-lesson-id="${lesson.id}"]`);
          lessonListEventHandler.onReviewClickHandler(reviewLink, lessons);
  
          const chevron = config.isLandscapeMode 
              ? document.querySelector(`.js-lesson-list-chevron[data-lesson-id="${lesson.id}"]`)
              : document.querySelectorAll(`.js-lesson-list-chevron[data-lesson-id="${lesson.id}"]`)[1];

          if(chevron) {
            lessonListEventHandler.onLessonIconClickHandler(chevron, lessons, config, false);          
          }
  
          const youtubeLessonIcon = document.querySelector(`.js-lesson-list-youtube[data-lesson-id="${lesson.id}"]`);
          if(youtubeLessonIcon) {
            youtubeLessonIcon.classList.add('hide-important');
          } 

          lessonListEventHandler.highlightActiveLesson(lesson.id);

        }, 250);
    });
};