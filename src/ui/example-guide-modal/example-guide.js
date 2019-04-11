import { actions } from 'redux/actions/action-creators';
import { returnTaxonIcon } from 'ui/helpers/icon-handler';
import { renderTemplate } from 'ui/helpers/templating';
import exampleGuideTemplate from 'ui/example-guide-modal/example-guide.html';
import { snapdragonCollections } from 'snapdragon/snapdragon-collections';

const closeModalListeners = [];

export const listenToCloseExampleGuideModal = listener => { 
    closeModalListeners.push(listener);
};

export const renderExampleGuideHandler = config => {

    const modal = document.getElementById('exampleGuide');

    let type = 'place', selectedLesson;

    const lessons = snapdragonCollections.filter(lesson => !lesson.default);

    const loadLessons = () => {

      lessons.forEach(lesson => {
          lesson.taxa = lesson.guide.iconicTaxa.map(taxon => taxon.common).join(', ');
      });

      const parent = modal.querySelector('.js-modal-guide-body div:nth-child(2)');
            parent.innerHTML = '';
      const template = document.createElement('template');
      template.innerHTML = exampleGuideTemplate;

      renderTemplate({lessons: lessons.filter(lesson => lesson.type === type)}, template.content, parent);

      const taxa = modal.querySelectorAll('.lesson-taxa');

      taxa.forEach(taxon => {
          const lessonId = parseInt(taxon.dataset.lessonId);
          const lessonTaxa = lessons.find(lesson => lesson.id === lessonId).guide.iconicTaxa.map(taxon => taxon.id);

          let icons = '';

          lessonTaxa.forEach(taxon => {
            const icon = returnTaxonIcon(taxon);
            icons += icon;
          });

          taxon.innerHTML = icons;
      });

      const navigationBtn = modal.querySelector('.js-modal-guide-navigation div:nth-child(2)');
      navigationBtn.disabled = true;
  
      const lessonSelectors = modal.querySelectorAll('.btn.btn-secondary');

      lessonSelectors.forEach(lesson => {

        const lessonId = parseInt(lesson.id.replace('id_', ''));
        const l = lessons.find(l => l.id === lessonId);

        const lessonLink = modal.querySelector(`#${lesson.id} span`);
              lessonLink.innerHTML = 
                l.externalLink !== undefined
                    ? `(${ l.externalLink.text })` 
                    : '';

        lesson.addEventListener('click', event => {
            let id = event.target.id.replace('id_', '');
            selectedLesson = lessons.find(lesson => lesson.id === parseInt(id));
            startLesson.classList.remove('disabled');
            saveChanges();
        });
      });

      const saveChanges = () => {

        config.guide = { ...config.guide, ...selectedLesson.guide };
        config.collection = { ...config.collection, ...selectedLesson.collection };
        actions.boundUpdateConfig(config);

        navigationBtn.disabled = false;
        navigationBtn.setAttribute('data-dismiss','modal');

        const txt = modal.querySelector('.js-saved');

        txt.innerHTML = 'Your preference has been updated';
          setTimeout(() => {
              txt.innerHTML = '';
          }, 2000);
      };

      navigationBtn.addEventListener('click', event => {
        closeModalListeners.forEach(listener => listener());
      });
    };

    loadLessons();

    const startLesson = document.querySelector('.js-start-lesson-wrapper');

    startLesson.classList.add('disabled');

    const categories = document.querySelectorAll('#exampleGuide .js-modal-guide-progress > div div');

    categories.forEach(category => category.addEventListener('click', event => {
      categories.forEach(c => c.classList.remove('completed'));
      type = event.target.id;
      Array.from(categories).find(c => c.id === type).classList.add('completed');
      loadLessons();
    }));
};