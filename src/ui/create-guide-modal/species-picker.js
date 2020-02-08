import { renderTemplate } from 'ui/helpers/templating';
import { speciesEditor } from 'ui/create-guide-modal/species-editor';

import speciesPickerTemplate from 'ui/create-guide-modal/species-picker-template.html';

export const renderSpeciesPicker = createGuide => {

    const { config, modal } = createGuide;

    const chosenOnes = modal.querySelector('.js-chosen');
          chosenOnes.classList.add('hide-important');

    const template = document.createElement('template');
          template.innerHTML = speciesPickerTemplate;

    const parent = modal.querySelector('.js-actions');
          parent.innerHTML = '';

    document.querySelector('.js-step-action-content .location-actions').classList.add('species-picker-actions');

    renderTemplate({}, template.content, parent);

    const title = modal.querySelector('.js-options');
          title.innerHTML = 'Add species by name.';

    const selectedSpeciesDisplay = modal.querySelector('.js-selected-species-container');
          selectedSpeciesDisplay.innerHTML = '';
    
    speciesEditor(config, modal, selectedSpeciesDisplay, createGuide, config.guide.species || []);
};
