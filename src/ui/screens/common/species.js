import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { itemVernacularName } from 'ui/helpers/data-checking';
import { collections } from 'snapdragon/species-collections';
import { renderTemplate } from 'ui/helpers/templating';
import speciesTemplate from 'ui/screens/common/species-template.html';

export const renderSpeciesCollection = (collectionId) => {

    if(isNaN(collectionId)) return;

    let { config} = store.getState();

    config.collection.id = collectionId;

    const template = document.createElement('template');

    template.innerHTML = speciesTemplate;

    DOM.leftBody.innerHTML = '';

    const collection = collections.filter(collection => collection.id === collectionId)[0];
    collection.items.forEach(item => { 
        item.image = item.images[0];
        item.vernacularName = itemVernacularName(item, config);
    });

    renderTemplate({ collection }, template.content, DOM.leftBody);

    const listItemContainer = document.querySelector('.js-list-item-container');
    const listItems = document.querySelectorAll('.js-list-item');

    listItems.forEach(listItem => {        
        listItem.addEventListener('click', (event) => {
            listItems.forEach(item => item.classList.remove('active'));
            const item = event.target;
            item.classList.add('active');
        })
    });

    const learningActionBtn = document.querySelector('.js-lesson-btn-action');

    learningActionBtn.addEventListener('click', event => {
        actions.boundChangeCollection(config);
    });
};