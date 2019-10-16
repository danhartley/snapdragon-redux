import { renderTemplate } from 'ui/helpers/templating';

import speciesTemplate from 'ui/create-guide-modal/species-template.html';

export const renderSpecies = createGuide => {

    const header = createGuide.modal.querySelector('.js-modal-title');
          header.innerHTML = 'Lesson Wizard';

    const options = [
        {
            text: 'A) Location-based',
            id: 'A'
        },
        {
            text: 'B) iNaturalist observations',
            id: 'B'
        },
        {
            text: 'C) Species picker',
            id: 'C'
        }
    ];

    const template = document.createElement('template');
          template.innerHTML = speciesTemplate;
    const parent = createGuide.modal.querySelector('.js-actions');
          parent.innerHTML = '';

    renderTemplate({ options }, template.content, parent);

    const handleNextStepAction = event => {
        createGuide.startLesson = createGuide.nextStepActionTxt.innerHTML.indexOf('Start Lesson') > -1; // hack        
        createGuide.goToNextStep(createGuide.getCurrentStep() + 1, 'NEXT', event.currentTarget.dataset.optionId);
        createGuide.listeners.push( { element: createGuide.nextStepAction, handler: handleNextStepAction });
    };

    const lessonOptions = document.querySelectorAll('.custom-lesson-species-list li');
          lessonOptions.forEach((option, index) => {
            option.addEventListener('click', handleNextStepAction, true);
        });
};