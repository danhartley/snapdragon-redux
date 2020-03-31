import { onCreateCustomLesson } from 'ui/create-guide-modal/species-search';
import { renderTemplate } from 'ui/helpers/templating';
import { lessonListEventHandler } from 'ui/screens/lists/lesson-list-event-handler';

import lessonTemplate from 'ui/screens/lists/lesson-template.html';

export const renderCustomLesson = (lessons, savedLessons, videoPlayer, score, config) => {

    onCreateCustomLesson(collection => {

        const parent = document.querySelector('.lesson-list > .scrollable');
        const template = document.createElement('template');
              template.innerHTML = lessonTemplate;
        
        const lesson = lessonListEventHandler.onLoadLessonViewState(collection, savedLessons, videoPlayer, score);
              lesson.hideVideoClass = '';
        
        lessons.push(lesson);
        
        renderTemplate({ lesson }, template.content, parent);
        
        const title = document.querySelector(`div.js-lesson-title[data-lesson-id="${lesson.id}"]`);
        lessonListEventHandler.onLessonIconClickHandler(title, lessons, config, true);

        const reviewLink = document.querySelector(`.js-review-link[data-lesson-id="${lesson.id}"]`);
        lessonListEventHandler.onReviewClickHandler(reviewLink, lessons);

        const chevron = document.querySelector(`div.js-lesson-list-chevron[data-lesson-id="${lesson.id}"]`);
              chevron.classList.remove('landscape');
        lessonListEventHandler.onLessonIconClickHandler(chevron, lessons, config, false);

        const youtubeLessonIcon = document.querySelector(`div.js-lesson-list-youtube[data-lesson-id="${lesson.id}"]`);
              youtubeLessonIcon.classList.add('hide-important');

              const scrollOptions = {
                left: 0,
                top: 1000,
                behavior: 'smooth'
              }
            
        document.querySelector('.js-lesson-container').scrollTo(scrollOptions);
    });
};