import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { kitchenGarden, nationalFlowers } from 'snapdragon/species-lessons';
import { renderTemplate } from 'ui/helpers/templating';
import snapdragonTemplate from 'ui/screens/cards/snapdragon-template.html';

export const renderSnapdragon = (counter) => {

    const { config } = store.getState();

    const template = document.createElement('template');

    template.innerHTML = snapdragonTemplate;

    const clone = document.importNode(template.content, true);

    const parent = DOM.leftBody;
    parent.innerHTML = '';

    const collections = [ kitchenGarden, nationalFlowers ];

    const context = { collections };

    renderTemplate(context, template.content, parent, clone);
};