import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { createGuideHandler } from 'ui/create-guide-modal/create-guide';
import { onCreateCustomLesson } from 'ui/create-guide-modal/species-pending';
import { renderLessonListHeader } from 'ui/screens/lists/lesson-list-header';
import { lessonListEventHandler } from 'ui/screens/lists/lesson-list-event-handler';

import lessonTemplate from 'ui/screens/lists/lesson-template.html';
import lessonListTemplate from 'ui/screens/lists/lesson-list-template.html';

export const renderLessons = () => {

    let { config, collections, lessons: savedLessons, videoPlayer, score } = store.getState();

    const template = document.createElement('template');
          template.innerHTML = lessonListTemplate;

    let lessons = lessonListEventHandler.onLoadLessonsViewState(savedLessons, collections, videoPlayer, score);
        lessons = [ ...lessons.filter(l => l.hasVideo), ...lessons.filter(l => !l.hasVideo) ];

    let parent = config.isPortraitMode ? DOM.rightBody : DOM.leftBody;
        parent.innerHTML = '';

    renderTemplate({}, template.content, parent);

    template.innerHTML = lessonTemplate;

    lessons.forEach(lesson => {
      lesson.hideVideoClass = lesson.hasVideo ? '' : 'hide-important';
      renderTemplate({ lesson }, template.content, document.querySelector('.js-lesson-container'));
    });

    renderLessonListHeader(parent);

    const createCustomLessonBtn = parent.querySelector('.js-create-custom-lesson');          
          createCustomLessonBtn.addEventListener('click', e => {
            createGuideHandler(1);
          });    

    const titles = document.querySelectorAll('.js-lesson-title');
          titles.forEach(title => lessonListEventHandler.onTitleClickHandler(title, lessons, config, true));

    const youtubeLessonIcons = document.querySelectorAll('.js-lesson-list-youtube');
          youtubeLessonIcons.forEach(youtube => lessonListEventHandler.onTitleClickHandler(youtube, lessons, config, true));

    const chevrons = document.querySelectorAll('.js-lesson-list-chevron');
          chevrons.forEach(chevron => lessonListEventHandler.onTitleClickHandler(chevron, lessons, config, false));

    const reviews = document.querySelectorAll('.js-lesson-review');
          reviews.forEach(reviewLink => lessonListEventHandler.onReviewClickHandler(reviewLink));

    onCreateCustomLesson(collection => {

        const parent = document.querySelector('.lesson-list > .scrollable');
        const template = document.createElement('template');
              template.innerHTML = lessonTemplate;
        
        const lesson = lessonListEventHandler.onLoadLessonViewState(collection, savedLessons, videoPlayer, score);
              lesson.hideVideoClass = '';
        
        lessons.push(lesson);
        
        renderTemplate({ lesson }, template.content, parent);
        
        const title = document.querySelector(`div.js-lesson-title[data-lesson-id="${lesson.id}"]`);
        lessonListEventHandler.onTitleClickHandler(title, lessons, config);

        const reviewLink = document.querySelector(`[data-lesson-id="${lesson.id}"]`);
        lessonListEventHandler.onReviewClickHandler(reviewLink);

        const chevron = document.querySelector(`div.js-lesson-list-chevron[data-lesson-id="${lesson.id}"]`);
        lessonListEventHandler.onTitleClickHandler(chevron, lessons, config, false);
    });
};
