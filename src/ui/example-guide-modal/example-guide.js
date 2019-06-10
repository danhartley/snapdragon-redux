import * as R from 'ramda';

import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { elem } from 'ui/helpers/class-behaviour';
import { actions } from 'redux/actions/action-creators';
import { renderHome } from 'ui/screens/home/home';
import { returnTaxonIcon } from 'ui/helpers/icon-handler';
import { enums } from 'ui/helpers/enum-helper';

import { renderTemplate } from 'ui/helpers/templating';
import exampleGuideTemplate from 'ui/example-guide-modal/example-guide-template.html';
import exampleLessonsTemplate from 'ui/example-guide-modal/example-guide.html';

const closeModalListeners = [];

export const listenToCloseExampleGuideModal = listener => { 
    closeModalListeners.push(listener);
};

export const renderExampleGuideHandler = () => {
    
    let { config, collections, lessons: savedLessons } = store.getState();

    const savedLessonNames = savedLessons.map(lesson => lesson.name);

    let template;

    if(config.isPortraitMode) {
        template = document.createElement('template');
        template.innerHTML = exampleGuideTemplate;
        DOM.rightBody.innerHTML = '';
        renderTemplate({}, template.content, DOM.rightBody);
    }

    const modal = document.getElementById('exampleGuide');

    let type = 'place', selectedLesson;

    const lessons = collections.filter(lesson => !lesson.default);

    const loadLessons = () => {

      lessons.forEach(lesson => {
        const isPaused = R.contains(lesson.name, savedLessonNames); 
        lesson.taxa = lesson.iconicTaxa.map(taxon => taxon.common).join(', ');
        lesson.savedState = isPaused
            ? '(lesson paused)'
            : '';
        lesson.isPaused = isPaused;    
      });

      const parent = modal.querySelector('.js-landscape-inner-body div:nth-child(2)');
            parent.innerHTML = '';
      
      template = document.createElement('template');
      template.innerHTML = exampleLessonsTemplate;

      const typeLessons = lessons.filter(lesson => lesson.type === type);

      renderTemplate({ lessons: typeLessons }, template.content, parent);

      const taxa = modal.querySelectorAll('.lesson-taxa');

      const iconiseTaxon = taxon => {

        const lessonId = parseInt(taxon.dataset.lessonId);
        const lesson = lessons.find(lesson => lesson.id === lessonId);
        const lessonTaxa = lesson.iconicTaxa;

        const iconicTaxaSummary = lessonTaxa.length === 8 ? 'All taxa' : lessonTaxa.map(taxon => taxon.common).join(',');
        let icons = `${iconicTaxaSummary}: `;

        lessonTaxa.forEach(taxon => {
          const icon = returnTaxonIcon(taxon.id);
          icons += icon;
        });

        taxon.innerHTML = icons;
      };

      for (const taxon of taxa) { iconiseTaxon(taxon); }

      const navigationBtn = modal.querySelector('.js-start-lesson-wrapper');
            navigationBtn.disabled = true;

      const startText = navigationBtn.querySelector('span:nth-child(1)');
  
      const lessonSelectors = modal.querySelectorAll('.btn.btn-secondary');

      lessonSelectors.forEach(lesson => {

        const lessonId = parseInt(lesson.id.replace('id_', ''));
        const l = lessons.find(l => l.id === lessonId);

        lesson.addEventListener('click', event => {
            let id = event.target.id.replace('id_', '');
            selectedLesson = lessons.find(lesson => lesson.id === parseInt(id));
            startLesson.classList.remove('disabled');
            saveChanges();
        });
      });

      const saveChanges = () => {

        navigationBtn.disabled = false;

        let state;

        if(selectedLesson.isPaused) {

          state = enums.lessonState.RESUME_LESSON;

          startText.innerHTML = 'Restart lesson';

          const savedLesson = savedLessons.find(lesson => lesson.name === selectedLesson.name);
          actions.boundRestartLesson(savedLesson);

        } else {

          state = enums.lessonState.GET_SPECIES;

          startText.innerHTML = 'Start lesson';
          
          const { config } = store.getState();
  
          config.guide = { ...config.guide, ...selectedLesson.guide };
          config.collection = { id: selectedLesson.id };
          actions.boundUpdateConfig(config);      
        }

        let startLessonHandler;

        if(config.isLandscapeMode) {
          navigationBtn.setAttribute('data-dismiss','modal');
          startLessonHandler = event => {
            closeModalListeners.forEach(listener => listener(state));
          };
        } else {
          startLessonHandler = event => {
            renderHome(0);
          };
        }

        navigationBtn.removeEventListener('click', startLessonHandler, true);
        navigationBtn.addEventListener('click', startLessonHandler, true);
      };     

      const chooseText = typeLessons.length > 1 
              ? `Choose from ${typeLessons.length} lessons`
              : 'One lesson available'

      modal.querySelector('.js-guide-text > span:nth-child(1)').innerHTML = chooseText;
    };

    const startLesson = document.querySelector('.js-start-lesson-wrapper');

    startLesson.classList.add('disabled');

    const categories = document.querySelectorAll('#exampleGuide .js-modal-guide-progress > div div');

    categories.forEach(category => {
      if(elem.hasClass(category, 'completed')) {
        type = category.id;
        loadLessons();
      }
      category.addEventListener('click', event => {
        categories.forEach(c => c.classList.remove('completed'));
        type = event.target.id;
        Array.from(categories).find(c => c.id === type).classList.add('completed');
        loadLessons();
      })
    });
};