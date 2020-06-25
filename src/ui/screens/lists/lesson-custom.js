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
        
        lesson.icon = lesson.icon || "https://static.inaturalist.org/photos/57604885/small.jpeg?1575746307";

        renderTemplate({ lesson }, template.content, parent);
        
        // const title = document.querySelector(`.js-lesson-title[data-lesson-id="${lesson.id}"]`);
        // lessonListEventHandler.onLessonTitleClickHandler(title, lessons);

        const reviewLink = document.querySelector(`.js-review-link[data-lesson-id="${lesson.id}"]`);
        lessonListEventHandler.onReviewClickHandler(reviewLink, lessons);

        const chevron = document.querySelector(`.js-lesson-list-chevron[data-lesson-id="${lesson.id}"]`);

        if(chevron) {
          chevron.classList.remove('landscape');
          lessonListEventHandler.onLessonIconClickHandler(chevron, lessons, config, false);
        }

        const youtubeLessonIcon = document.querySelector(`.js-lesson-list-youtube[data-lesson-id="${lesson.id}"]`);
        if(youtubeLessonIcon) {
          youtubeLessonIcon.classList.add('hide-important');
        }

        const scrollOptions = {
          left: 0,
          top: 1000,
          behavior: 'smooth'
        }
            
        document.querySelector('.js-lesson-container').scrollTo(scrollOptions);
    });
};