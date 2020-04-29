import { onCreateCustomLesson } from 'ui/create-guide-modal/create-guide';
import { renderTemplate } from 'ui/helpers/templating';
import { lessonListEventHandler } from 'ui/screens/lists/lesson-list-event-handler';

import lessonTemplate from 'ui/screens/lists/lesson-template.html';

export const renderCustomLesson = (lessons, savedLessons, videoPlayer, score, config) => {

    onCreateCustomLesson(collection => {

        const parent = document.querySelector('.lesson-list > .scrollable');
        const template = document.createElement('template');
              template.innerHTML = lessonTemplate;
        
        const lesson = lessonListEventHandler.onLoadLessonViewState(collection, savedLessons, videoPlayer, score, config);
              lesson.hideVideoClass = 'hide-important';
              lesson.hideTextIntroClass = '';
        
        lessons.push(lesson);
        
        lesson.icon = lesson.icon || "https://content.eol.org/data/media/55/9d/2c/509.118977.98x68.jpg";

        renderTemplate({ lesson }, template.content, parent);
        
        const title = document.querySelector(`div.js-lesson-title[data-lesson-id="${lesson.id}"]`);
        lessonListEventHandler.onLessonTitleClickHandler(title, lessons);

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