import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { modalImageHandler } from 'ui/helpers/handlers';
import { itemVernacularName } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import speciesTemplate from 'ui/screens/common/species-template.html';

export const renderSpeciesCollectionList = (collection) => {

    const { config: currentConfig, layout } = store.getState();

    const config = { ...currentConfig, ...{ id: collection.id} };

    const template = document.createElement('template');

    template.innerHTML = speciesTemplate;

    collection.items.forEach(item => { 
        item.image = item.images[0];
        item.vernacularName = itemVernacularName(item, config);
    });

    DOM.leftBody.innerHTML = '';

    renderTemplate({ collection }, template.content, DOM.leftBody);

    // const height = `height:${document.querySelector('.js-left-header').offsetHeight}px`;

    // document.querySelector('.js-list-header').setAttribute('style', height); 
    // document.querySelector('.js-list-footer').setAttribute('style', height); 

    const listItemContainer = document.querySelector('.js-list-item-container');
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