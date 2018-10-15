import { DOM } from 'ui/dom';
import { utils } from 'utils/utils';
import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import { traits } from 'api/traits/traits';
import speciesTemplate from 'ui/screens/lists/species-table-template.html';
import speciesPortraitTemplate from 'ui/screens/lists/species-table-portrait-template.html';

export const buildTable = (collection, config) => {

    const template = document.createElement('template');

    let totalPasses = 0;
    let totalFails = 0;

    const wide = window.matchMedia("(min-width: 1200px)").matches;

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
    template.innerHTML = wide ? speciesTemplate : speciesPortraitTemplate;

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
    const filterHeader = document.createElement('th');
    filterHeader.classList.add('not-sortable');

    const checkbox = document.createElement('span');
    const inputCheck = document.createElement('input');

    checkbox.classList.add('custom-control');
    checkbox.classList.add('form-control-lg');
    checkbox.classList.add('custom-checkbox');
    inputCheck.id = 'inputCheckAll'
    inputCheck.type = "checkbox";
    inputCheck.checked = true;
    inputCheck.classList.add('custom-control-input');
    const labelCheck = document.createElement('label');
    labelCheck.classList.add('custom-control-label');
    labelCheck.setAttribute('for', 'inputCheckAll');
    checkbox.appendChild(inputCheck);
    checkbox.appendChild(labelCheck);    
    indexHeader.innerHTML = `<span></span>`;
    speciesHeader.innerHTML = '<span>Species</span';
    familyHeader.innerHTML = '<span>Family</span>';
    passesHeader.innerHTML = '<span class="icon"><i class="fas fa-check-circle"></i></span>';
    failsHeader.innerHTML = '<span class="icon"><i class="fas fa-times-circle"></i></span>';
    filterHeader.appendChild(checkbox); 
    imageHeader.innerHTML = '<div></div>';
    if(wide) {        
        headerRow.appendChild(indexHeader);
        headerRow.appendChild(imageHeader);
        headerRow.appendChild(speciesHeader);    
        headerRow.appendChild(familyHeader);
        headerRow.appendChild(passesHeader);
        headerRow.appendChild(failsHeader); 
    } else {
        headerRow.appendChild(imageHeader);    
        headerRow.appendChild(speciesHeader);
        headerRow.appendChild(passesHeader);
        headerRow.appendChild(failsHeader);     
    }
    headerRow.appendChild(filterHeader);      

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
    const filterFooter = document.createElement('td');

    imageFooter.innerHTML = '<div></div>';
    indexFooter.innerHTML = '<div></div>';
    speciesFooter.innerHTML = '<div></div>';
    familyFooter.innerHTML = '<div></div>';

    passesFooter.innerHTML = `<div>${totalPasses}</div>`;
    failsFooter.innerHTML = `<div>${totalFails}</div>`;

    filterFooter.innerHTML = '<div></div>';

    if(wide) {
        footerRow.appendChild(imageFooter);
        footerRow.appendChild(indexFooter);
        footerRow.appendChild(speciesFooter);
        footerRow.appendChild(familyFooter);
        footerRow.appendChild(passesFooter);
        footerRow.appendChild(failsFooter);
    } else {
        footerRow.appendChild(imageFooter);
        footerRow.appendChild(speciesFooter);
        footerRow.appendChild(passesFooter);
        footerRow.appendChild(failsFooter);
    }
    footerRow.appendChild(filterFooter);

    tfoot.appendChild(footerRow);
    table.appendChild(tfoot);

    utils.makeSortable(document);    
}
