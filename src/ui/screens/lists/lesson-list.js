import * as R from 'ramda';

import { subscription } from 'redux/subscriptions';
import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { actions } from 'redux/actions/action-creators';
import { elem } from 'ui/helpers/class-behaviour';
import { renderSpeciesCollectionList } from 'ui/screens/lists/species-list';
import { renderLesson } from 'ui/screens/home/home-lesson-intro';
import { createGuideHandler } from 'ui/create-guide-modal/create-guide';
import { listenToCloseCreateGuideModal } from 'ui/create-guide-modal/create-guide';

import lessonListTemplate from 'ui/screens/lists/lesson-list-template.html';
import lessonListHeaderTemplate from 'ui/screens/lists/lesson-list-header-template.html';

export const renderLessons = () => {

    const thisScreen = subscription.getByName('renderLessons');
    
    if(thisScreen) subscription.remove(thisScreen);

    let { config, collections, lessons: savedLessons } = store.getState();

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
      });
    };

    loadLessons();

    let parent = config.isPortraitMode ? DOM.rightBody : DOM.leftBody;

    parent.innerHTML = '';

    renderTemplate({ lessons }, template.content, parent);

    const header = document.createElement("div");
          header.innerHTML = lessonListHeaderTemplate;

    parent = document.querySelector('.lesson-list .scrollable');
    parent.prepend(header);

    const createCustomLessonBtn = parent.querySelector('.js-create-custom-lesson');
          
          createCustomLessonBtn.addEventListener('click', e => {
            createGuideHandler(1);
          });    

    const titles = document.querySelectorAll('.btn.btn-secondary');

    config.guide.ready = true;
    actions.boundUpdateConfig(config);

    if(config.isLandscapeMode) {

      const callback = (lessonId, loadingMessage) => {
        loadingMessage.classList.add('hide');
        scrollToTitle(lessonId);
      };

      const scrollToTitle = lessonId => {
        const next = lessonId - 1;
        const href = `#id_${next}`;
        console.log(href);
        window.location.href = href;
      };

      titles.forEach(title => title.addEventListener('click', e => {

        const selectedTitle = e.currentTarget;
        const lessonId = parseInt(selectedTitle.id.replace('id_', ''));
        const selectedLesson = lessons.find(l => l.id === lessonId);
        const container = document.querySelector(`#container_${lessonId}`);
        const speciesList = document.querySelector(`#species_list_id_${lessonId}`);
        
        let otherSpecies = Array.from(document.querySelectorAll('.js-species-container'));
            otherSpecies = otherSpecies.filter(container => container.id !== `container_${lessonId}`);
            otherSpecies.forEach(container => container.innerHTML = '');

        if(selectedTitle.dataset.selected && speciesList) {
          if(elem.hasClass(speciesList, 'hide')) {
            renderLesson(selectedLesson);
            speciesList.classList.remove('hide');
          } 
          else {
            speciesList.classList.add('hide');
          }
        } else {
            selectedTitle.dataset.selected = true;
            const loadingMessage = selectedTitle.parentElement.querySelector('.js-loading-message');
                  loadingMessage.classList.remove('hide');
            const loadSpeciesCallback = () => callback(lessonId, loadingMessage);
            renderSpeciesCollectionList(selectedLesson, { readOnlyMode: false, parent: container, tableParent: container, loadSpeciesCallback, isInCarousel: false });
            renderLesson(selectedLesson);
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

        const selectedTitle = e.currentTarget;
        const lessonId = parseInt(selectedTitle.id.replace('id_', ''));
        const selectedLesson = lessons.find(l => l.id === lessonId);
        renderLesson(selectedLesson);
        
      }));      
    }

    const toggleCtrl = document.querySelector('.js-toggle-control');
    const toggleElem = document.querySelector('.js-toggle-element');

          toggleCtrl.addEventListener('click', e => {

            toggleVideoInputState();

            e.stopPropagation();

            const state = e.currentTarget.dataset.toggleState;
            switch(state) {
              case 'on': 
                toggleCtrl.dataset.toggleState = 'off';
                toggleElem.dataset.toggleState = 'off';
                break;
              case 'off':
                toggleCtrl.dataset.toggleState = 'on';
                toggleElem.dataset.toggleState = 'on';
                break;
            }
          });

    const videoFilter = document.querySelector('.js-filter-by-video');
    videoFilter.addEventListener('click', e => {
      const lessonsWithoutVideo = document.querySelectorAll('div[data-has-video="false"]');
      const checked = e.currentTarget.children[0].checked;
      checked 
        ? lessonsWithoutVideo.forEach(lesson => lesson.classList.remove('hide-important'))
        : lessonsWithoutVideo.forEach(lesson => lesson.classList.add('hide-important'));
    });

    videoFilter.click();
};

const toggleVideoInputState = () => {
  const input = document.querySelector('#chkVideo');
  if(input.hasAttribute('disabled')) {
    input.removeAttribute('disabled');
  } else {
    input.setAttribute('disabled', 'disabled');
  }
};