import { DOM } from 'ui/dom';
import { persistor } from 'redux/store';
import { renderCollections } from 'ui/screens/left/collections';
import { renderSnapdragon } from 'ui/screens/right/snapdragon';
import { renderTemplate } from 'ui/helpers/templating';
import { closeModal } from 'ui/helpers/modal-toggle';
import menuTemplate from 'ui/screens/common/menu.html';

export const renderMenu = () => {
    
    DOM.modalText.innerHTML = '';

    const template = document.createElement('template');
    
    template.innerHTML = menuTemplate;
    
    DOM.modalTextTitle.innerHTML = 'Snapdragon menu';

    renderTemplate({ }, template.content, DOM.modalText);
    
    const clearCacheBtn = document.querySelector('.js-clear-cache-btn');
    const collectionsBtn = document.querySelector('.js-change-collection-btn');

    clearCacheBtn.addEventListener('click', () => {
        persistor.purge();
        window.location.reload(true);
    });

    const handleCollectionsClick = () => {
        renderCollections();
        renderSnapdragon();
        closeModal('menuModal');
    };

    collectionsBtn.addEventListener('click', handleCollectionsClick);
};