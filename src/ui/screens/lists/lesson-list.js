import * as R from 'ramda';

import { subscription } from 'redux/subscriptions';
import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { elem } from 'ui/helpers/class-behaviour';
import { renderSpeciesCollectionList } from 'ui/screens/lists/species-list';
import { renderLesson } from 'ui/screens/home/home-lesson-intro';
import { createGuideHandler } from 'ui/create-guide-modal/create-guide';
import { listenToCloseCreateGuideModal } from 'ui/create-guide-modal/create-guide';
import { videoHandler } from 'ui/screens/lists/video-handler';
import { renderLessonListHeader } from 'ui/screens/lists/lesson-list-header';

import lessonListTemplate from 'ui/screens/lists/lesson-list-template.html';

export const renderLessons = () => {

    subscription.removeByName('renderLessons');
    
    let { config, collections, lessons: savedLessons, videoPlayer } = store.getState();

    const savedLessonNames = savedLessons.map(lesson => lesson.name);

    const template = document.createElement('template');
          template.innerHTML = lessonListTemplate;

    const lessons = collections.filter(collection => !collection.default);

    const loadLessons = () => {

      lessons.forEach(lesson => {
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

    const titles = document.querySelectorAll('.btn.btn-secondary');

    if(config.isLandscapeMode) {

      const callback = (lessonId, loadingMessage) => {
        loadingMessage.classList.add('hide');
        scrollToTitle(lessonId);
      };

      const scrollToTitle = lessonId => {
        const next = lessonId - 1;
        const href = `#id_${next}`;
        window.location.href = href;
      };

      titles.forEach(title => title.addEventListener('click', e => {

        const { title, lesson, state, speciesList, container } = extractLesson(e, lessons);

        if(state.revealSpeciesList) {
          renderLesson(lesson);
          speciesList.classList.remove('hide');
        }

        if(state.hideSpeciesList) {
          speciesList.classList.add('hide');
        }

        if(state.requiresSpeciesList) {
            title.dataset.selected = true;
            const loadingMessage = title.parentElement.querySelector('.js-loading-message');
                  loadingMessage.classList.remove('hide');
            const loadSpeciesCallback = () => callback(lesson.id, loadingMessage);
            renderSpeciesCollectionList(lesson, { readOnlyMode: false, parent: container, tableParent: container, loadSpeciesCallback, isInCarousel: false });
            renderLesson(lesson);
        }      
      }));

      if(config.collection.id > 0) {
        const lessonId = config.collection.id;
        const lessonTitle = document.querySelector(`#lesson_${lessonId}`);
              lessonTitle.click();
      }
    }

    if(config.isPortraitMode) {
      
      titles.forEach(title => title.addEventListener('click', e => {

        const title = e.currentTarget;
        const lessonId = parseInt(title.id.replace('id_', ''));
        const lesson = lessons.find(l => l.id === lessonId);
        renderLesson(lesson);
        
      }));      
    }
};

const extractLesson = (e, lessons) => {

  const title = e.currentTarget;
  const lessonId = parseInt(title.id.replace('id_', ''));
  const lesson = lessons.find(l => l.id === lessonId);
  const container = document.querySelector(`#container_${lessonId}`);
  const speciesList = document.querySelector(`#species_list_id_${lessonId}`);
  
  let otherSpecies = Array.from(document.querySelectorAll('.js-species-container'));
      otherSpecies = otherSpecies.filter(container => container.id !== `container_${lessonId}`);
      otherSpecies.forEach(container => container.innerHTML = '');

  const isSpeciesListAvailable = !!title.dataset.selected && !!speciesList; 
  const isSpeciesListHidden = elem.hasClass(speciesList, 'hide');

  const state = {
    requiresSpeciesList: !isSpeciesListAvailable,
    revealSpeciesList: isSpeciesListAvailable && isSpeciesListHidden,
    hideSpeciesList: isSpeciesListAvailable && !isSpeciesListHidden
  };

  return { title, lesson, state, speciesList, container };
};
