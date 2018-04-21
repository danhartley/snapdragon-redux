import { DOM } from 'ui/dom';

export const renderSnapdragon = () => {

    const template = document.querySelector('.js-snapdragon');

    const clone = document.importNode(template.content, true);
    
    DOM.rightBody.innerHTML = '';
    DOM.rightBody.appendChild(clone);

};