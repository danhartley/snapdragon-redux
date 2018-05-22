import { DOM } from 'ui/dom';

export const renderSnapdragon = () => {

    DOM.rightHeader.style.backgroundColor = 'rgb(12, 44, 84)';

    const template = document.querySelector('.js-snapdragon');

    const clone = document.importNode(template.content, true);
        
    DOM.rightBody.innerHTML = '';
    DOM.rightBody.appendChild(clone);

};