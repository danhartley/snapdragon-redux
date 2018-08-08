import { DOM } from 'ui/dom';
import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { modalImageHandler } from 'ui/helpers/handlers';
import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import speciesTemplate from 'ui/screens/lists/species-table-template.html';

export const renderSpeciesCollectionList = collection => {

    const { config: currentConfig, score, history } = store.getState();

    const config = { ...currentConfig, ...{ collection: { id: collection.id } } };

    const template = document.createElement('template');

    collection.items.forEach(item => { 
        item.image = item.images[0];
        item.vernacularName = itemProperties.vernacularName(item, config);
    });

    let parent = config.isPortraitMode ? DOM.rightBody : DOM.leftBody;
    parent.innerHTML = '<div class="snapdragon-container species-list js-species-list"></div>';
    parent = parent.querySelector('.snapdragon-container.js-species-list');
    template.innerHTML = speciesTemplate;

    renderTemplate({ collection }, template.content, parent);

    const listItems = document.querySelectorAll('.js-list-item .js-list-item-link');

    listItems.forEach(listItem => {        
        listItem.addEventListener('click', (event) => {
            listItems.forEach(item => item.classList.remove('active'));
            const item = event.target;
            item.classList.add('active');
        })
    });

    const tbody = document.querySelector('.species-table tbody');
    
    const row = document.createElement('tr');
    row.classList.add('table-header');
    const header0 = document.createElement('th');
    const header1 = document.createElement('th');
    const header2 = document.createElement('th');
    const header3 = document.createElement('th');
    header0.innerHTML = '<div></div>';
    header1.innerHTML = 'Species';
    header2.innerHTML = 'Family';
    header3.innerHTML = '<span class="icon"><i class="fas fa-check-circle"></i></span>';
    row.appendChild(header0);
    row.appendChild(header1);
    if(!config.isPortraitMode) {
        row.appendChild(header2);
        row.appendChild(header3);
    } 

    tbody.insertBefore(row, tbody.children[0]);

    utils.makeSortable(document);

    const listItemImages = document.querySelectorAll('.js-list-item');

    listItemImages.forEach(itemImage => { modalImageHandler(itemImage); });    

    const continueLearningActionBtn = document.querySelector('.js-species-list-btn-action');
    
    if(continueLearningActionBtn) {
        continueLearningActionBtn.addEventListener('click', () => {
            actions.boundChangeCollection(config);
        });
    }
};