import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { modalImageHandler } from 'ui/helpers/handlers';
import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import speciesTemplate from 'ui/screens/lists/species-list-template.html';

export const renderSpeciesCollectionList = (collection, append = false) => {

    const { config: currentConfig, layout } = store.getState();

    const config = { ...currentConfig, ...{ id: collection.id} };

    const template = document.createElement('template');

    collection.items.forEach(item => { 
        item.image = item.images[0];
        item.vernacularName = itemProperties.vernacularName(item, config);
    });

    let parent;

    // if(append) {
    //     template.innerHTML = speciesTemplate;
    //     const clone = document.importNode(template.content, true);
    //     const listGroup = clone.querySelector('.list-group');
    //     parent = document.querySelector('.list-group-collection');
    //     parent.innerHTML += listGroup;
    //     const scrollableArea = document.querySelector('.scrollable');
    //     scrollableArea.style.height = scrollableArea.offsetHeight / 2 + 'px';
    // } else {
        parent = config.isPortraitMode ? DOM.rightBody : DOM.leftBody;
        parent.innerHTML = '<div class="snapdragon-container js-species-list"></div>';
        parent = parent.querySelector('.snapdragon-container.js-species-list');
        template.innerHTML = speciesTemplate;
    // }

    renderTemplate({ collection }, template.content, parent);

    const listItems = document.querySelectorAll('.js-list-item .js-list-item-link');

    listItems.forEach(listItem => {        
        listItem.addEventListener('click', (event) => {
            listItems.forEach(item => item.classList.remove('active'));
            const item = event.target;
            item.classList.add('active');
        })
    });

    const listItemImages = document.querySelectorAll('.js-list-item div img');

    listItemImages.forEach(itemImage => { modalImageHandler(itemImage); });    

    const continueLearningActionBtn = document.querySelector('.js-continue-lesson-btn-action');
    if(continueLearningActionBtn) {
        continueLearningActionBtn.disabled = layout ? false : true;
        continueLearningActionBtn.addEventListener('click', () => {
            actions.boundToggleLesson({ lesson: 'active' });
        });
    }
};