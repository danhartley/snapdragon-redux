import { DOM } from 'ui/dom';
import { persistor } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import menuTemplate from 'ui/screens/common/menu.html';

export const renderMenu = () => {
    
    const template = document.createElement('template');
    
    template.innerHTML = menuTemplate;
    
    DOM.modalTitle.innerHTML = 'Snapdragon menu';
    DOM.modalImage.src = '';

    renderTemplate({ }, template.content, DOM.modalBody);
    
    const changeCollectionBtn = document.querySelector('.js-change-collection-btn');

    changeCollectionBtn.addEventListener('click', () => {
        persistor.purge();
        window.location.reload(true);
    });

};