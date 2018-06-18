import { DOM } from 'ui/dom';
import snapdragonTemplate from 'ui/screens/right/snapdragon-template.html';

export const renderSnapdragon = () => {

    const template = document.createElement('template');

    template.innerHTML = snapdragonTemplate;

    const clone = document.importNode(template.content, true);

    DOM.leftBody.innerHTML = '';
    DOM.leftBody.appendChild(clone);
};