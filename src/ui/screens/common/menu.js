import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { persistor } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
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

    const { config } = store.getState();

    const delay = config.callbackTime/1000;

    renderTemplate({ delay }, template.content, DOM.modalText);
    
    const clearCacheBtn = document.querySelector('.js-clear-cache-btn');
    const collectionsBtn = document.querySelector('.js-change-collection-btn');
    const setDelayBtn = document.querySelector('.js-set-delay-btn');
    const setDelayInput = document.querySelector('.js-set-delay-input');

    clearCacheBtn.addEventListener('click', () => {        
        clearCacheBtn.innerText = 'Clearing cache...';
        setTimeout(() => {
            persistor.purge();
            clearCacheBtn.innerText = 'Cache cleared';
            setTimeout(() => {                                
                setTimeout(() => {
                    window.location.reload(true);                        
                }, 500);
            }, 500);
        }, 1000);
    });

    const handleCollectionsClick = () => {
        renderCollections();
        renderSnapdragon();
        closeModal('menuModal');
    };

    collectionsBtn.addEventListener('click', handleCollectionsClick);

    setDelayBtn.addEventListener('click', () => {
        const delay = setDelayInput.value * 1000;
        config.callbackTime = delay;
        actions.boundUpdateConfig(config);
    });
};