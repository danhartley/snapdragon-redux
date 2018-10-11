import { DOM } from 'ui/dom';
import { utils } from 'utils/utils';
import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import { traits } from 'api/traits/traits';
import speciesTemplate from 'ui/screens/lists/species-table-template.html';
import speciesPortraitTemplate from 'ui/screens/lists/species-table-portrait-template.html';
import speciesSmallLandscapeTemplate from 'ui/screens/lists/species-table-small-landscape-template.html';

export const buildTable = (collection, config) => {

    const template = document.createElement('template');

    let totalPasses = 0;
    let totalFails = 0;

    collection.items.forEach(item => { 
        item.image = item.list || item.images[0];
        item.vernacularName = itemProperties.vernacularName(item, config);
        item.passes = item.passes || '--';
        item.fails = item.fails || '--';
        item.binomial = item.name;
        item.shortName = itemProperties.trimLatinName(item.name);
        totalPasses += Number.isInteger(item.passes) ? item.passes : 0;
        totalFails += Number.isInteger(item.fails) ? item.fails : 0;
        item.keyTrait = itemProperties.getActiveTrait(traits, item.name, config.language, [{ name: 'how edible', formatter: trait => trait.value }]);
    });

    let parent = config.isPortraitMode ? DOM.rightBody : DOM.leftBody;
    parent.innerHTML = '<div class="snapdragon-container species-list js-species-list"></div>';
    parent = parent.querySelector('.snapdragon-container.js-species-list');
    template.innerHTML = config.isPortraitMode ? speciesPortraitTemplate : config.isSmallLandscapeMode ? speciesSmallLandscapeTemplate : speciesTemplate;

    renderTemplate({ collection }, template.content, parent);

    const table = document.querySelector('.species-table');
    const tbody = document.querySelector('.species-table tbody');
    
    const headerRow = document.createElement('tr');
    headerRow.classList.add('table-header');
    const indexHeader = document.createElement('th');
    const imageHeader = document.createElement('th');
    const speciesHeader = document.createElement('th');
    const familyHeader = document.createElement('th');
    const passesHeader = document.createElement('th');
    const failsHeader = document.createElement('th');
    const sorter = document.createElement('span');
    const checkbox = document.createElement('span');
    const inputCheck = document.createElement('input');
    if(config.isPortraitMode) {
        checkbox.innerHTML = '<span>View</span>';
    }    
    checkbox.classList.add('custom-control');
    checkbox.classList.add('form-control-lg');
    checkbox.classList.add('custom-checkbox');
    checkbox.classList.add('not-sortable');
    inputCheck.id = 'inputCheckAll'
    inputCheck.type = "checkbox";
    inputCheck.checked = true;
    inputCheck.classList.add('custom-control-input');
    const labelCheck = document.createElement('label');
    labelCheck.classList.add('custom-control-label');
    labelCheck.setAttribute('for', 'inputCheckAll');
    checkbox.appendChild(inputCheck);
    checkbox.appendChild(labelCheck);    
    speciesHeader.innerHTML = '<span>Species</span';
    familyHeader.innerHTML = '<span>Family</span>';
    passesHeader.innerHTML = '<span class="icon"><i class="fas fa-check-circle"></i></span>';
    failsHeader.innerHTML = '<span class="icon"><i class="fas fa-times-circle"></i></span>';
    if(!config.isPortraitMode) {
        indexHeader.appendChild(sorter);
        indexHeader.appendChild(checkbox);
        imageHeader.innerHTML = '<div></div>';
    } else {
        imageHeader.appendChild(checkbox);
    }
    if(config.isPortraitMode) {
        headerRow.appendChild(imageHeader);    
        headerRow.appendChild(speciesHeader);
        headerRow.appendChild(passesHeader);
        headerRow.appendChild(failsHeader);     
    } else if(config.isSmallLandscapeMode) {
        headerRow.appendChild(indexHeader);
        headerRow.appendChild(imageHeader);
        headerRow.appendChild(speciesHeader);
        headerRow.appendChild(passesHeader);
        headerRow.appendChild(failsHeader);
    }
    else {
        headerRow.appendChild(indexHeader);
        headerRow.appendChild(imageHeader);
        headerRow.appendChild(speciesHeader);    
        headerRow.appendChild(familyHeader);
        headerRow.appendChild(passesHeader);
        headerRow.appendChild(failsHeader);
    } 

    tbody.insertBefore(headerRow, tbody.children[0]);

    const tfoot = document.createElement('tfoot');
    const footerRow = document.createElement('tr');
    footerRow.classList.add('table-footer');

    const imageFooter = document.createElement('td');
    const indexFooter = document.createElement('td');
    const speciesFooter = document.createElement('td');
    const familyFooter = document.createElement('td');
    const passesFooter = document.createElement('td');
    const failsFooter = document.createElement('td');

    imageFooter.innerHTML = '<div></div>';
    indexFooter.innerHTML = '<div></div>';
    speciesFooter.innerHTML = '<div></div>';
    familyFooter.innerHTML = '<div></div>';

    passesFooter.innerHTML = `<div>${totalPasses}</div>`;
    failsFooter.innerHTML = `<div>${totalFails}</div>`;

    if(config.isPortraitMode) {
        footerRow.appendChild(imageFooter);
        footerRow.appendChild(speciesFooter);
        footerRow.appendChild(passesFooter);
        footerRow.appendChild(failsFooter);
    } else if(config.isSmallLandscapeMode) {
        footerRow.appendChild(imageFooter);
        footerRow.appendChild(indexFooter);
        footerRow.appendChild(speciesFooter);
        footerRow.appendChild(passesFooter);
        footerRow.appendChild(failsFooter);
    } else {
        footerRow.appendChild(imageFooter);
        footerRow.appendChild(indexFooter);
        footerRow.appendChild(speciesFooter);
        footerRow.appendChild(familyFooter);
        footerRow.appendChild(passesFooter);
        footerRow.appendChild(failsFooter);
    }

    tfoot.appendChild(footerRow);
    table.appendChild(tfoot);

    utils.makeSortable(document);    
}
