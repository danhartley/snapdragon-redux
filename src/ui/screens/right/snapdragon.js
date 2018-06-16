import { store } from 'redux/store';
import { DOM } from 'ui/dom';

export const renderSnapdragon = () => {

    const { config, collection } = store.getState();

    if(collection && collection.items) return;

    if(config.isPortraitMode) {
        DOM.leftGrid.style.display = 'grid';
        DOM.rightGrid.style.display = 'none';
    } else {

        DOM.rightHeader.style.backgroundColor = 'rgb(12, 44, 84)';

        const template = document.querySelector('.js-snapdragon');

        const clone = document.importNode(template.content, true);
            
        DOM.rightBody.innerHTML = '';
        DOM.rightBody.appendChild(clone);
    }
};