import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { createGuideHandler } from 'ui/create-guide-modal/create-guide';
import { listenToCloseCreateGuideModal } from 'ui/create-guide-modal/create-guide';
import { videoHandler } from 'ui/screens/lists/video-handler';
import { renderLessonListHeader } from 'ui/screens/lists/lesson-list-header';
import { enums } from 'ui/helpers/enum-helper';
import { lessonStateHandler } from 'ui/screens/lists/lesson-state-handler';
import { lessonListScrollHandler } from 'ui/screens/lists/lesson-list-scroll-handler';
import { lessonListHandler } from 'ui/screens/lists/lesson-list-handler';

import lessonListTemplate from 'ui/screens/lists/lesson-list-template.html';

export const renderLessons = () => {

    let { config, collections, lessons: savedLessons, videoPlayer } = store.getState();

    const template = document.createElement('template');
          template.innerHTML = lessonListTemplate;

    const lessons = lessonStateHandler.loadLessons(savedLessons, collections, videoPlayer);

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

      const callback = (lessonId, loadingMessage) => {
        loadingMessage.classList.add('hide');
        lessonListScrollHandler.scrollToTitle(lessonId);
      };

      titles.forEach(title => title.addEventListener('click', e => {

        e.stopPropagation();

        const { title, lesson, state, speciesList, container, titleState } = lessonListHandler.updates(e, lessons);

        if(state.revealSpeciesList) {
          lessonStateHandler.onClick({ state: enums.lessonState.BEGIN_INTRO, lesson });
          speciesList.classList.remove('hide');
        }

        if(state.hideSpeciesList) {
          speciesList.classList.add('hide');
          titleState.innerHTML = videoHandler.getLessonState(store.getState().videoPlayer || [], lesson);
        }

        if(state.requiresSpeciesList) {
            title.dataset.selected = true;
            const loadingMessage = title.parentElement.querySelector('.js-loading-message');
                  loadingMessage.classList.remove('hide');
            const loadSpeciesCallback = () => callback(lesson.id, loadingMessage);
            lessonStateHandler.onClick({ state: enums.lessonState.BEGIN_INTRO, lesson, container, loadSpeciesCallback, isInCarousel: false, requireSpecies: true });
        }
      }));

      // setTimeout(() => {
      //   if(config.collection.id > 0) {
      //     const lessonId = config.collection.id;
      //     const lessonTitle = document.querySelector(`.js-lesson-title[data-lesson-id="${lessonId}"]`);
      //           lessonTitle.click();
      //   } 
      // },1000);
    }

    if(config.isPortraitMode) {
      
      titles.forEach(title => title.addEventListener('click', e => {
        const title = e.currentTarget;
        const lessonId = parseInt(title.dataset.lessonId);
        const lesson = lessons.find(l => l.id === lessonId);
        lessonStateHandler.onClick({ state: enums.lessonState.BEGIN_INTRO, lesson });
      }));      
    }

    const reviews = document.querySelectorAll('.js-lesson-review');
          reviews.forEach(reviewLink => {
            lessonStateHandler.onClick({ state: enums.lessonState.BEGIN_LESSON, target: reviewLink }) 
          });
};