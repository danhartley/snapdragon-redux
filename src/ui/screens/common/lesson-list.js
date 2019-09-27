import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { actions } from 'redux/actions/action-creators';
import { elem } from 'ui/helpers/class-behaviour';
import { renderSpeciesCollectionList } from 'ui/screens/lists/species-list';

import exampleGuideTemplate from 'ui/screens/common/lesson-list-template.html';

export const renderLessons = () => {

    let { config, collections, lessons: savedLessons } = store.getState();

    const savedLessonNames = savedLessons.map(lesson => lesson.name);

    const template = document.createElement('template');
          template.innerHTML = exampleGuideTemplate;

    const lessons = collections.filter(lesson => !lesson.default).filter(lesson => lesson.itemNames);

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

    const parent = config.isPortraitMode ? DOM.rightBody : DOM.leftBody;

    parent.innerHTML = '';

    renderTemplate({ lessons }, template.content, parent);

    const titles = document.querySelectorAll('.active-title');

    config.guide.ready = true;
    actions.boundUpdateConfig(config);

    const callback = message => {
      message.classList.add('hide');
    };

    titles.forEach(title => title.addEventListener('click', e => {
      const selectedTitle = e.target;
      const lessonId = selectedTitle.id;
      const selectedLesson = lessons.find(l => l.id === parseInt(lessonId));
      const container = document.querySelector(`#container_${lessonId}`);
      const speciesList = selectedTitle.parentElement.parentElement.querySelector('.scrollable');
      if(selectedTitle.dataset.selected) {
        if(elem.hasClass(speciesList, 'hide')) {
          speciesList.classList.remove('hide');
          container.style.minHeight = container.dataset.height;
        } else {
          speciesList.classList.add('hide');
          container.dataset.height = `${container.offsetHeight}px`;
          container.style.minHeight = 0;
        }
      } else {
        selectedTitle.dataset.selected = true;
        const message = selectedTitle.parentElement.querySelector('span:nth-child(2)');
              message.classList.remove('hide');
        const loadSpeciesCallback = () => callback(message);
        renderSpeciesCollectionList(selectedLesson, { readOnlyMode: false, parent: container, tableParent: container, loadSpeciesCallback, isInCarousel: false });
      }
    }));
};