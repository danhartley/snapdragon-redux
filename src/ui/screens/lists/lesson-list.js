import * as R from 'ramda';

import { subscription } from 'redux/subscriptions';
import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { elem } from 'ui/helpers/class-behaviour';
import { renderSpeciesList } from 'ui/screens/lists/species-list';
import { renderLesson } from 'ui/screens/home/home-lesson-intro';
import { createGuideHandler } from 'ui/create-guide-modal/create-guide';
import { listenToCloseCreateGuideModal } from 'ui/create-guide-modal/create-guide';
import { videoHandler } from 'ui/screens/lists/video-handler';
import { renderLessonListHeader } from 'ui/screens/lists/lesson-list-header';
import { lessonHandler } from 'ui/helpers/lesson-handler';
import { enums } from 'ui/helpers/enum-helper';
import { onChangeLessonState } from 'ui/fixtures/lesson-test-state-change';

import lessonListTemplate from 'ui/screens/lists/lesson-list-template.html';

export const renderLessons = () => {

    let { config, collections, lessons: savedLessons, videoPlayer } = store.getState();

    const savedLessonNames = savedLessons.map(lesson => lesson.name);

    const template = document.createElement('template');
          template.innerHTML = lessonListTemplate;

    const lessons = collections.filter(collection => !collection.default);

    const loadLessons = () => {

      lessons.forEach((lesson, index) => {
        const isPaused = R.contains(lesson.name, savedLessonNames); 
        lesson.taxa = lesson.iconicTaxa.map(taxon => taxon.common).join(', ');
        lesson.savedState = isPaused
            ? '(lesson paused)'
            : '';
        lesson.isPaused = isPaused;
        lesson.hasVideo = lesson.video ? true : false;        
        lesson.state = videoHandler.getLessonState(videoPlayer || [], lesson);
      });
    };

    loadLessons();

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
        scrollToTitle(lessonId);
      };

      const siblingsBefore = lessonId => {
        
        let siblings = document.querySelectorAll('.js-lesson-list-item:not(.hide-important)');
        let sibling = siblings[0];
        let index = 0;

        const before = [];
        
        while(sibling) {
          index++;
          if(parseInt(sibling.dataset.lessonId) !== lessonId) {
            before.push(sibling);
            sibling = siblings[index];
          } else {
            sibling = null;
          }
        }

        return before.length;
      };

      const scrollToTitle = lessonId => {
        setTimeout(() => {
          const standardBlock = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--vhRow').replace('px', ''));
          const unit = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--vh').replace('px', ''));
          const rows = siblingsBefore(lessonId);
          const top = (standardBlock * rows) - unit;

          const scroll = document.querySelector('.lesson-list .scrollable');
          scroll.scrollTop = top;
        });
      };

      titles.forEach(title => title.addEventListener('click', e => {

        e.stopPropagation();

        const { title, lesson, state, speciesList, container, titleState, reviewLink } = extractLesson(e, lessons);

        if(state.revealSpeciesList) {
          renderLesson(lesson);
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
            renderSpeciesList(lesson, { readOnlyMode: false, parent: container, tableParent: container, loadSpeciesCallback, isInCarousel: false });
            renderLesson(lesson);
        }

        if(reviewLink) {
          onChangeLessonState(reviewLink);
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

        lessonHandler.changeState(enums.lessonState.RESUME_LESSON);
        
        const title = e.currentTarget;
        const lessonId = parseInt(title.dataset.lessonId);
        const lesson = lessons.find(l => l.id === lessonId);
        renderLesson(lesson);
        
      }));      
    }
};

const extractLesson = (e, lessons) => {

  const title = e.currentTarget;
  const lessonId = parseInt(title.dataset.lessonId);
  const lesson = lessons.find(l => l.id === lessonId);
  const container = document.querySelector(`.js-species-container[data-container-id="${lessonId}"]`);
  const speciesList = document.querySelector(`#species_list_id_${lessonId}`);
  const reviewLink = document.querySelector(`.js-lesson-review[data-review-link="${lessonId}"]`);

  let otherSpecies = Array.from(document.querySelectorAll('.js-species-container'));
      otherSpecies = otherSpecies.filter(container => container.id !== `container_${lessonId}`);
      otherSpecies.forEach(container => container.innerHTML = '');

  const isSpeciesListAvailable = !!title.dataset.selected && !!speciesList; 
  const isSpeciesListHidden = elem.hasClass(speciesList, 'hide');

  const titleState = document.querySelector(`.js-lesson-state[data-lesson-id="${lessonId}"]`);

  const state = {
    requiresSpeciesList: !isSpeciesListAvailable,
    revealSpeciesList: isSpeciesListAvailable && isSpeciesListHidden,
    hideSpeciesList: isSpeciesListAvailable && !isSpeciesListHidden
  };

  return { title, lesson, state, speciesList, container, titleState, reviewLink };
};
