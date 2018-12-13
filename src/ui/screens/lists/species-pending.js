import { DOM } from 'ui/dom';
import { renderTemplate } from 'ui/helpers/templating';
import { listenToPlaceChange } from 'geo/geo';
import spinnerTemplate from 'ui/screens/lists/species-pending-template.html';

export const speciesPendingSpinner = (config) => {

    const template = document.createElement('template');
    template.innerHTML = spinnerTemplate;

    const parent = config.isPortraitMode ? DOM.rightBody : DOM.leftBody;
    parent.innerHTML = '';
    
    renderTemplate({ }, template.content, parent);

    const callback = place => {
        const localAreaText = document.querySelector('.species-pending .local-area');
        if(!localAreaText) return;
        localAreaText.innerHTML = `the ${place.area.text} area`;
    }

    listenToPlaceChange(callback);

    const update = document.querySelector('.species-pending div:nth-child(4)');

    setTimeout(() => {
        update.innerHTML = 'Still searching...';
        setTimeout(() => {
            update.innerHTML = 'The lesson is nearly ready...';
        }, 2000);
    },5000);
};