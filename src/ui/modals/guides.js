import { renderTemplate } from 'ui/helpers/templating';
import guidesTemplate from 'ui/modals/guides-list-template.html';

export const renderGuides = (config, modal) => {

    const template = document.createElement('template');
    template.innerHTML = guidesTemplate;
    const parent = modal.querySelector('.js-guides');
    parent.innerHTML = '';
    renderTemplate({ }, template.content, parent);

}