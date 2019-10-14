import { renderTemplate } from 'ui/helpers/templating';

import speciesTemplate from 'ui/create-guide-modal/species-template.html';

export const renderSpecies = createGuide => {

    const header = createGuide.modal.querySelector('.js-modal-title');
          header.innerHTML = 'Lesson Wizard'
          header.style = 'margin: 0 1rem 0 1rem; height: initial; text-transform: uppercase;';

    // const icon = createGuide.modal.querySelector('.js-arrow-wrapper');
    //       icon.innerHTML = '<i class="far fa-arrow-alt-circle-down"></i>';

    const options = [
        {
            text: 'A) Location-based',
            link: ''
        },
        {
            text: 'B) iNaturalist observations',
            link: ''
        },
        {
            text: 'C) Species picker',
            link: ''
        }
    ];

    const template = document.createElement('template');
          template.innerHTML = speciesTemplate;
    const parent = createGuide.modal.querySelector('.js-actions');
          parent.innerHTML = '';

    renderTemplate({ options }, template.content, parent);

    const handleNextStepAction = event => {
        createGuide.startLesson = createGuide.nextStepActionTxt.innerHTML.indexOf('Start Lesson') > -1; // hack
        createGuide.createStep(createGuide.getCurrentStep() + 1, 'NEXT');
        createGuide.listeners.push( { element: createGuide.nextStepAction, handler: handleNextStepAction });
    };

    const lessonOptions = document.querySelectorAll('.custom-lesson-species-list li');
          lessonOptions.forEach((option, index) => {
            option.addEventListener('click', handleNextStepAction, true);
          });
};