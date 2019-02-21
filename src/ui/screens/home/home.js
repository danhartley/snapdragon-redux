import { DOM } from 'ui/dom';
import { renderTemplate } from 'ui/helpers/templating';
import homeTemplate from 'ui/screens/home/home-template.html';
import { createGuideHandler } from 'ui/create-guide-modal/create-guide';

export const renderHome = () => {

    const template = document.createElement('template');
    template.innerHTML = homeTemplate;

    DOM.rightBody.innerHTML = '';

    renderTemplate({}, template.content, DOM.rightBody);

    document.querySelector('.js-create-guide-link').addEventListener('click', event => {        
        createGuideHandler(1);
    });
};