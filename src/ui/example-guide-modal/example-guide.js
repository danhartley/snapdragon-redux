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

      const typeLessons = lessons.filter(lesson => lesson.type === type);

      renderTemplate({ lessons: typeLessons }, template.content, parent);

      const taxa = modal.querySelectorAll('.lesson-taxa');

      const iconiseTaxon = taxon => {

        const lessonId = parseInt(taxon.dataset.lessonId);
        const lessonTaxa = lessons.find(lesson => lesson.id === lessonId).guide.iconicTaxa.map(taxon => taxon.id);

        let icons = '';

        lessonTaxa.forEach(taxon => {
          const icon = returnTaxonIcon(taxon);
          icons += icon;
        });

        taxon.innerHTML = icons;
      };

      for (const taxon of taxa) { iconiseTaxon(taxon); }

      const navigationBtn = modal.querySelector('.js-start-lesson-wrapper');
      navigationBtn.disabled = true;
  
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

        const closeModal = event => {
          closeModalListeners.forEach(listener => listener());
        };

        navigationBtn.removeEventListener('click', closeModal, true);
        navigationBtn.addEventListener('click', closeModal, true);
      };     

      const chooseText = typeLessons.length > 1 
              ? `Choose from ${typeLessons.length} lessons`
              : 'One lesson available'

      modal.querySelector('.js-guide-text > span:nth-child(1)').innerHTML = chooseText;
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