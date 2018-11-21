import { DOM } from 'ui/dom';
import { renderTemplate } from 'ui/helpers/templating';
import spinnerTemplate from 'ui/screens/lists/species-pending-template.html';

export const renderSpinner = (config) => {

    const template = document.createElement('template');
    template.innerHTML = spinnerTemplate;

    const parent = config.isPortraitMode ? DOM.rightBody : DOM.leftBody;
    parent.innerHTML = '';
    if(!config.region) return;
    renderTemplate({ area: config.region.text }, template.content, parent);

    const update = document.querySelector('.species-pending div:nth-child(4)');

    setTimeout(() => {
        update.innerHTML = 'Still searching...';
        setTimeout(() => {
            update.innerHTML = 'The lesson is nearly ready...';
        }, 2000);
    },5000);

};