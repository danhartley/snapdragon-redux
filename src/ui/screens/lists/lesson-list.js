import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { createGuideHandler } from 'ui/create-guide-modal/create-guide';
import { onCloseCreateGuideModal } from 'ui/screens/lists/species-pending';
import { renderLessonListHeader } from 'ui/screens/lists/lesson-list-header';
import { enums } from 'ui/helpers/enum-helper';
import { lessonStateHandler } from 'ui/screens/lists/lesson-state-handler';
import { lessonListHandler } from 'ui/screens/lists/lesson-list-handler';

import lessonTemplate from 'ui/screens/lists/lesson-template.html';
import lessonListTemplate from 'ui/screens/lists/lesson-list-template.html';

export const renderLessons = () => {

    let { config, collections, lessons: savedLessons, videoPlayer, score } = store.getState();

    const template = document.createElement('template');
          template.innerHTML = lessonListTemplate;

    const lessons = lessonStateHandler.loadLessons(savedLessons, collections, videoPlayer, score);

    let parent = config.isPortraitMode ? DOM.rightBody : DOM.leftBody;
        parent.innerHTML = '';

    renderTemplate({ lessons }, template.content, parent);

    renderLessonListHeader(parent);

    const createCustomLessonBtn = parent.querySelector('.js-create-custom-lesson');          
          createCustomLessonBtn.addEventListener('click', e => {
            createGuideHandler(1);
          });    

    const titles = document.querySelectorAll('.js-lesson-title');

    if(config.isLandscapeMode) {
      titles.forEach(title => lessonListHandler.titleClickHandler(title, lessons, lessonListHandler.onSpeciesListLoad));
    }

    if(config.isPortraitMode) {
      
      titles.forEach(title => title.addEventListener('click', e => {
        const title = e.currentTarget;
        const lessonId = parseInt(title.dataset.lessonId);
        const lesson = lessons.find(l => l.id === lessonId);
        lessonStateHandler.bindAction({ state: enums.lessonState.BEGIN_INTRO, lesson });
      }));      
    }

    const reviews = document.querySelectorAll('.js-lesson-review');
          reviews.forEach(reviewLink => {
            lessonStateHandler.bindAction({ state: enums.lessonState.BEGIN_LESSON, target: reviewLink });
          });

    onCloseCreateGuideModal(collection => {

        if(!collection || collection.length === 0) return;

        const parent = document.querySelector('.lesson-list > .scrollable');

        const template = document.createElement('template');
              template.innerHTML = lessonTemplate;

        const lesson = lessonStateHandler.loadLesson(collection, savedLessons, videoPlayer, score);

        lessons.push(lesson);

        renderTemplate({ lesson }, template.content, parent);

        const row = document.querySelector(`div.js-lesson-list-item[data-lesson-id="${lesson.id}"]`);
              row.classList.add('lesson-list-custom-item');

        const title = document.querySelector(`div.js-lesson-title[data-lesson-id="${lesson.id}"]`);
        lessonListHandler.titleClickHandler(title, lessons, lessonListHandler.onSpeciesListLoad);

        const reviewLink = document.querySelector(`div[data-review-link="${lesson.id}"]`);
        lessonStateHandler.bindAction({ state: enums.lessonState.BEGIN_LESSON, target: reviewLink });
    });
};