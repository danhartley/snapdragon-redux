import { DOM } from 'ui/dom';
import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { modalImageHandler } from 'ui/helpers/handlers';
import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import speciesTemplate from 'ui/screens/lists/species-table-template.html';
import speciesPortraitTemplate from 'ui/screens/lists/species-table-portrait-template.html';

export const renderSpeciesCollectionList = (collection) => {

    const { config: currentConfig } = store.getState();

    const config = { ...currentConfig, ...{ collection: { id: collection.id } } };

    const template = document.createElement('template');

    collection.items.forEach(item => { 
        item.image = item.images[0];
        item.vernacularName = itemProperties.vernacularName(item, config);
        item.passes = item.passes || '--';
        item.fails = item.fails || '--';
        item.binomial = config.isPortraitMode ? itemProperties.trimLatinName(item.name) : item.name
    });

    let parent = config.isPortraitMode ? DOM.rightBody : DOM.leftBody;
    parent.innerHTML = '<div class="snapdragon-container species-list js-species-list"></div>';
    parent = parent.querySelector('.snapdragon-container.js-species-list');
    template.innerHTML = config.isPortraitMode ? speciesPortraitTemplate : speciesTemplate;

    renderTemplate({ collection }, template.content, parent);

    const tbody = document.querySelector('.species-table tbody');
    
    const row = document.createElement('tr');
    row.classList.add('table-header');
    const imageHeader = document.createElement('th');
    const indexHeader = document.createElement('th');
    const speciesHeader = document.createElement('th');
    const familyHeader = document.createElement('th');
    const passesHeader = document.createElement('th');
    const failsHeader = document.createElement('th');
    indexHeader.innerHTML = '#';
    imageHeader.innerHTML = '<div></div>';
    speciesHeader.innerHTML = 'Species';
    familyHeader.innerHTML = 'Family';
    passesHeader.innerHTML = '<span class="icon"><i class="fas fa-check-circle"></i></span>';
    failsHeader.innerHTML = '<span class="icon"><i class="fas fa-times-circle"></i></span>';
    if(config.isPortraitMode) {
        row.appendChild(imageHeader);    
        row.appendChild(speciesHeader);
        row.appendChild(passesHeader);
        row.appendChild(failsHeader);     
    }
    else {
        row.appendChild(indexHeader);
        row.appendChild(imageHeader);
        row.appendChild(speciesHeader);    
        row.appendChild(familyHeader);
        row.appendChild(passesHeader);
        row.appendChild(failsHeader);
    } 

    tbody.insertBefore(row, tbody.children[0]);

    utils.makeSortable(document);

    const listItemImages = document.querySelectorAll('.js-list-item');

    listItemImages.forEach(itemImage => { modalImageHandler(itemImage); });    

    const continueLearningActionBtn = document.querySelector('.js-species-list-btn-action');
  
    // Portrait mode only

    if(continueLearningActionBtn) {
        continueLearningActionBtn.addEventListener('click', () => {
            actions.boundChangeCollection(config);
        });
    }
};