import { DOM } from 'ui/dom';
// import 'ui/screens/right/snapdragon-templ.html';

export const renderSnapdragon = () => {

    DOM.rightHeader.style.backgroundColor = 'rgb(12, 44, 84)';

    const template = document.querySelector('.js-snapdragon');

    const clone = document.importNode(template.content, true);
        
    DOM.rightBody.innerHTML = '';
    DOM.rightBody.appendChild(clone);

};