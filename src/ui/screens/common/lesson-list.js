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

import lessonListTemplate from 'ui/screens/common/lesson-list-template.html';
import lessonListHeaderTemplate from 'ui/screens/common/lesson-list-header-template.html';

export const renderLessons = () => {

    const thisScreen = subscription.getByName('renderLessons');
    if(thisScreen) subscription.remove(thisScreen);

    let { config, collections, lessons: savedLessons } = store.getState();

    const savedLessonNames = savedLessons.map(lesson => lesson.name);

    const template = document.createElement('template');
          template.innerHTML = lessonListTemplate;

    const lessons = collections.filter(lesson => !lesson.default);//.filter(lesson => lesson.video);

    const loadLessons = () => {

      lessons.forEach(lesson => {
        const isPaused = R.contains(lesson.name, savedLessonNames); 
        lesson.taxa = lesson.iconicTaxa.map(taxon => taxon.common).join(', ');
        lesson.savedState = isPaused
            ? '(lesson paused)'
            : '';
        lesson.isPaused = isPaused;    
      });
    };

    loadLessons();

    let parent = config.isPortraitMode ? DOM.rightBody : DOM.leftBody;

    parent.innerHTML = '';

    renderTemplate({ lessons }, template.content, parent);

    const header = document.createElement("label");
          header.innerHTML = lessonListHeaderTemplate;
          header.classList.add('btn');
          header.classList.add('btn-secondary');
          header.classList.add('pointer-events-none');

    parent = document.querySelector('.btn-group.btn-group-toggle');
    parent.prepend(header);

    const createCustomLessonBtn = parent.querySelector('.js-create-custom-lesson');
          createCustomLessonBtn.classList.add('pointer-events-initial');
    createCustomLessonBtn.addEventListener('click', () => {
      createGuideHandler(1);
    });    

    const titles = document.querySelectorAll('.active-title');

    config.guide.ready = true;
    actions.boundUpdateConfig(config);

    const callback = loadingMessage => {
      loadingMessage.classList.add('hide');
    };

    const scrollToTitle = title => {
      const elem = title.parentElement.parentElement.parentElement || title;
      elem.scrollIntoView(true);
    };

    titles.forEach(title => title.addEventListener('click', e => {

      const selectedTitle = e.target;
      const lessonId = parseInt(selectedTitle.id.replace('lesson_', ''));
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
          container.style.minHeight = container.dataset.height;
          scrollToTitle(title);
        } else {
          speciesList.classList.add('hide');
          container.dataset.height = `${container.offsetHeight}px`;
          container.style.minHeight = 0;
        }
      } else {
          selectedTitle.dataset.selected = true;
          const loadingMessage = selectedTitle.parentElement.querySelector('.js-loading-message');
                loadingMessage.classList.remove('hide');
          const loadSpeciesCallback = () => callback(loadingMessage);
          renderSpeciesCollectionList(selectedLesson, { readOnlyMode: false, parent: container, tableParent: container, loadSpeciesCallback, isInCarousel: false });
          renderLesson(selectedLesson);
          scrollToTitle(title);
      }      
    }));

    if(config.collection.id > 0) {
      const lessonId = config.collection.id;
      const lessonTitle = document.querySelector(`#lesson_${lessonId}`);
            lessonTitle.click();
    }
};