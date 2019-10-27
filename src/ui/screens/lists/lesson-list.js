import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { createGuideHandler } from 'ui/create-guide-modal/create-guide';
import { onCloseCreateGuideModal } from 'ui/screens/lists/species-pending';
import { videoHandler } from 'ui/screens/lists/video-handler';
import { renderLessonListHeader } from 'ui/screens/lists/lesson-list-header';
import { enums } from 'ui/helpers/enum-helper';
import { lessonStateHandler } from 'ui/screens/lists/lesson-state-handler';
import { lessonListScrollHandler } from 'ui/screens/lists/lesson-list-scroll-handler';
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

      const speciesLoaded = (lessonId, loadingMessage) => {
        loadingMessage.classList.add('hide');
        lessonListScrollHandler.scrollToTitle(lessonId);
      };

      titles.forEach(title => title.addEventListener('click', e => {

        e.stopPropagation();

        const { title, lesson, state, speciesList, container, lessonVideoState } = lessonListHandler.parseLessonElement(e, lessons);

        if(state.revealSpeciesList) {
          lessonStateHandler.bindAction({ state: enums.lessonState.BEGIN_INTRO, lesson });
          speciesList.classList.remove('hide');
        }

        if(state.hideSpeciesList) {
          speciesList.classList.add('hide');
          lessonVideoState.innerHTML = videoHandler.setVideoState(store.getState().videoPlayer || [], lesson);
        }

        if(state.requiresSpeciesList) {
            title.dataset.selected = true;
            const loadingMessage = title.parentElement.querySelector('.js-loading-message');
                  loadingMessage.classList.remove('hide');
            const loadSpeciesCallback = () => speciesLoaded(lesson.id, loadingMessage);
            lessonStateHandler.bindAction({ state: enums.lessonState.BEGIN_INTRO, lesson, container, loadSpeciesCallback, isInCarousel: false, requireSpecies: true });
        }
      }));
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

      setTimeout(() => {
        renderTemplate({ lesson }, template.content, parent);
      }, 10000);
            
      // var eElement; // some E DOM instance
      // var newFirstElement; //element which should be first in E
      
      // eElement.insertBefore(newFirstElement, eElement.firstChild);

    });
};