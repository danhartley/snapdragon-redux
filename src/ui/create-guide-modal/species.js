import { renderTemplate } from 'ui/helpers/templating';

import speciesTemplate from 'ui/create-guide-modal/species-template.html';

export const renderSpecies = createGuide => {

    const header = createGuide.modal.querySelector('.js-modal-guide-progress');
          header.innerHTML = 'Choose species, location, etc.'
          header.style = 'margin: 0 1rem 0 1rem; height: initial; text-transform: uppercase;';

    const icon = createGuide.modal.querySelector('.js-arrow-wrapper');
          icon.innerHTML = '<i class="far fa-arrow-alt-circle-down"></i>';

    const options = [
        {
            text: 'Choose a location and the taxa that are of interest to you.',
            link: ''
        },
        {
            text: 'Species observed by an iNaturalist user or users.',
            link: ''
        },
        {
            text: 'Choose individual species by name.',
            link: ''
        }
    ];

    const template = document.createElement('template');
          template.innerHTML = speciesTemplate;
    const parent = createGuide.modal.querySelector('.js-actions');
          parent.innerHTML = '';

    renderTemplate({ options }, template.content, parent);
};