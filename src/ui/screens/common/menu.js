import { DOM } from 'ui/dom';
import { persistor } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import menuTemplate from 'ui/screens/common/menu.html';

export const renderMenu = () => {
    
    const template = document.createElement('template');
    
    template.innerHTML = menuTemplate;
    
    DOM.modalTitle.innerHTML = 'Snapdragon menu';
    DOM.modalImageContainer.style.display = 'none';

    renderTemplate({ }, template.content, DOM.modalText);
    
    const clearCacheBtn = document.querySelector('.js-clear-cache-btn');

    clearCacheBtn.addEventListener('click', () => {
        persistor.purge();
        window.location.reload(true);
    });

};