import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import snapdragonTemplate from 'ui/screens/right/snapdragon-template.html';

export const renderSnapdragon = () => {

    const { config, collection } = store.getState();

    if(collection && collection.items) return;

    if(config.isPortraitMode) {
        DOM.leftGrid.style.display = 'grid';
        DOM.rightGrid.style.display = 'none';
    } else {

        DOM.rightHeader.style.backgroundColor = 'rgb(12, 44, 84)';

        const template = document.createElement('template');

        template.innerHTML = snapdragonTemplate;

        const clone = document.importNode(template.content, true);
            
        DOM.rightBody.innerHTML = '';
        DOM.rightBody.appendChild(clone);
    }
};