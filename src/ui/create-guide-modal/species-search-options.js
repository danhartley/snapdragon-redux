import { renderTemplate } from 'ui/helpers/templating';
import { enums } from 'ui/helpers/enum-helper';
import { languagePicker } from 'ui/screens/common/language-selection';

import speciesTemplate from 'ui/create-guide-modal/species-search-options-template.html';

export const renderSpeciesSearchOptions = createGuide => {

    const header = createGuide.modal.querySelector('.js-modal-title > header');
          header.innerHTML = 'Create your own lesson';

    const options = [
        {
            text: 'By location and season',
            id: enums.guideOption.LOCATION.name
        },
        {
            text: 'From iNaturalist observations',
            id: enums.guideOption.INAT.name
        },
        {
            text: 'Using a name-based search',
            id: enums.guideOption.PICKER.name
        }
    ];

    const template = document.createElement('template');
          template.innerHTML = speciesTemplate;
    const parent = createGuide.modal.querySelector('.js-actions');
          parent.innerHTML = '';

    const config = createGuide.getConfig();

    renderTemplate({ options }, template.content, parent);

    const handleNextStepAction = event => {

        const option = event.currentTarget.dataset.option;
        const step = createGuide.steps.find(s => s.number === createGuide.getCurrentStep().number);
        const nextStepName = step.nextSteps.find(step => step.id === option).step;
        const nextStep = createGuide.steps.find(s => s.description === nextStepName);

        createGuide.startLesson = false;        
        createGuide.goToNextStep(createGuide.getCurrentStep().number + 1, 'NEXT', option, nextStep);
        createGuide.listeners = [];
        createGuide.listeners.push( { element: createGuide.nextStepActionArrow, handler: handleNextStepAction });
    };

    const lessonOptions = document.querySelectorAll('.custom-lesson-menu-options li');
    
    lessonOptions.forEach((option, index) => {
        option.addEventListener('click', handleNextStepAction, true);
    });

    languagePicker(config, document.querySelector('.js-language-selection-container'), (config) => {
        createGuide.setConfig(config);
    });

    const warning = createGuide.modal.querySelector('.js-persistence-warning');
            
    if(createGuide.user) {
        warning.classList.add('hide-important');
    }
};