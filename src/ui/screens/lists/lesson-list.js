import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { createGuideHandler } from 'ui/create-guide-modal/create-guide';
import { onCreateCustomLesson } from 'ui/create-guide-modal/species-pending';

import { renderLessonListHeader } from 'ui/screens/lists/lesson-list-header';

import { lessonStateHandler } from 'ui/screens/lists/lesson-state-handler';
import { lessonListEventHandler } from 'ui/screens/lists/lesson-list-event-handler';
import { lessonListScrollHandler } from 'ui/screens/lists/lesson-list-scroll-handler';

import lessonTemplate from 'ui/screens/lists/lesson-template.html';
import lessonListTemplate from 'ui/screens/lists/lesson-list-template.html';

export const renderLessons = () => {

    let { config, collections, lessons: savedLessons, videoPlayer, score } = store.getState();

    const template = document.createElement('template');
          template.innerHTML = lessonListTemplate;

    let lessons = lessonStateHandler.loadLessonViewStates(savedLessons, collections, videoPlayer, score);
        lessons = [ ...lessons.filter(l => l.hasVideo), ...lessons.filter(l => !l.hasVideo) ];

    let parent = config.isPortraitMode ? DOM.rightBody : DOM.leftBody;
        parent.innerHTML = '';

    renderTemplate({ lessons }, template.content, parent);

    renderLessonListHeader(parent);

    const createCustomLessonBtn = parent.querySelector('.js-create-custom-lesson');          
          createCustomLessonBtn.addEventListener('click', e => {
            createGuideHandler(1);
          });    

    const titles = document.querySelectorAll('.js-lesson-title');
          titles.forEach(title => lessonListEventHandler.onTitleClickHandler(title, lessons, config));

    const reviews = document.querySelectorAll('.js-lesson-review');
          reviews.forEach(reviewLink => lessonListEventHandler.onReviewClickHandler(reviewLink));

    onCreateCustomLesson(collection => {

        const parent = document.querySelector('.lesson-list > .scrollable');
        const template = document.createElement('template');
              template.innerHTML = lessonTemplate;
        
        const lesson = lessonStateHandler.loadLessonViewState(collection, savedLessons, videoPlayer, score);
        
        lessons.push(lesson);
        
        renderTemplate({ lesson }, template.content, parent);
        
        highlightActiveLesson(lesson);
        
        const title = document.querySelector(`div.js-lesson-title[data-lesson-id="${lesson.id}"]`);
        lessonListEventHandler.onTitleClickHandler(title, lessons, config);

        const reviewLink = document.querySelector(`div[data-review-link="${lesson.id}"]`);
        lessonStateHandler.onReviewClickHandler(reviewLink);
    });

    highlightActiveLesson(collections.find(collection => collection.id === config.collection.id));
};

const highlightActiveLesson = lesson => {  
  if(lesson && lesson.id > 0) {
    lessonListScrollHandler.scrollToTitle(lesson.id);
    const row = document.querySelector(`div.js-lesson-list-item[data-lesson-id="${lesson.id}"]`);
    row.classList.add('lesson-list-custom-item');
  }
}
