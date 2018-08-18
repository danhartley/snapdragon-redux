import { DOM } from 'ui/dom';
import { kitchenGarden, nationalFlowers, rhsTrees } from 'snapdragon/species-lessons';
import { renderTemplate } from 'ui/helpers/templating';
import snapdragonTemplate from 'ui/screens/home/snapdragon-template.html';

export const renderSnapdragon = (counter) => {

    const template = document.createElement('template');

    template.innerHTML = snapdragonTemplate;

    const clone = document.importNode(template.content, true);

    const parent = DOM.leftBody;
    parent.innerHTML = '';

    const collections = [ kitchenGarden, nationalFlowers, rhsTrees ];

    const context = { collections };

    renderTemplate(context, template.content, parent, clone);
};