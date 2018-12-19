import * as SD from 'api/traits/trait-types';

import { DOM } from 'ui/dom';
import { utils } from 'utils/utils';
import { taxa } from 'api/snapdragon/taxa';
import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import { imageUseCases, scaleImage } from 'ui/helpers/image-handlers';
import speciesTemplate from 'ui/screens/lists/species-table-template.html';
import speciesPortraitTemplate from 'ui/screens/lists/species-table-portrait-template.html';

export const buildTable = (collection, config, traits, enums) => {

    const template = document.createElement('template');

    const wide = window.matchMedia("(min-width: 1024px)").matches;

    const getTraitName = (item, enums) => {
        let traitName = '';        
        let keyTratLinkClass = 'capitalise underline-link js-key-trait-link';
        if(item.taxonomy) {
            switch(item.taxonomy.phylum.toLowerCase()) {
                case 'ascomycota':
                    traitName = item.taxonomy.order.toLowerCase() === 'pezizales'
                        ? enums.name.HOW_EDIBLE
                        : enums.name.THALLUS_TYPE;
                    if(item.taxonomy.order.toLowerCase() === 'pezizales') keyTratLinkClass = 'js-key-trait-link';
                    break;
                case 'basidiomycota':
                    traitName = enums.name.HOW_EDIBLE;
                    keyTratLinkClass = 'js-key-trait-link';
                    break;
                default:
                    traitName = '-';
            }        
        } else {
            keyTratLinkClass = 'js-key-trait-link';
        }
        return { traitName, keyTratLinkClass };
    }

    collection.items.forEach(item => { 
        
        item.image = item.list ? item.images.find(i => i.url === item.list) : item.images[0];
        item.license = item.image.license;
        item.url = scaleImage(item.image, imageUseCases.SPECIES_LIST, config);
        item.rightsHolder = item.image.rightsHolder;
        item.source = item.image.source;

        item.binomial = item.name;
        item.shortName = itemProperties.trimLatinName(item.name);
        const { traitName, keyTratLinkClass } = getTraitName(item, enums);
        const keyTrait = itemProperties.getActiveTrait(traits, item.name, [{ name: traitName, formatter: trait => trait.value }]);
        item.keyTrait = keyTrait.indexOf(',') > 0 ? keyTrait.split(',')[0] : keyTrait;
        item.keyTratLinkClass = keyTratLinkClass;
        item.familyLinkClass = itemProperties.familyHasTaxaData(item.family, taxa) ? 'capitalise underline-link js-family-link' : 'js-family-link' 
    });

    let parent = config.isPortraitMode ? DOM.rightBody : DOM.leftBody;
    parent.innerHTML = '<div class="snapdragon-container species-list js-species-list"></div>';
    parent = parent.querySelector('.snapdragon-container.js-species-list');
    template.innerHTML = wide ? speciesTemplate : speciesPortraitTemplate;

    renderTemplate({ collection }, template.content, parent);

    const keyTraits = document.querySelectorAll('.js-key-trait-link');

    keyTraits.forEach(vn => {        
        const keyTrait = vn.dataset.keyTrait;
        const span = document.createElement('span');
        switch(keyTrait) {                
            case SD.howEdible.CHOICE:
                span.innerHTML = '<span class="icon choice"></span>';
                vn.append(span);
                break;
            case SD.howEdible.EDIBLE:
                span.innerHTML = '<span class="icon edible"></span>';
                vn.append(span);
                break;
            case SD.howEdible.INEDIBLE:
                span.innerHTML = '<span class="icon inedible"></span>';
                vn.append(span);
                break;
            case SD.howEdible.POISONOUS:
            case SD.howEdible.DEADLY:
                span.innerHTML = '<span class="icon toxic"></span>';
                vn.append(span);
                break;
        }
    });

    const table = document.querySelector('.species-table');
    const tbody = document.querySelector('.species-table tbody');
    
    const headerRow = document.createElement('tr');
    headerRow.classList.add('table-header');
    const imageHeader = document.createElement('th');
    const speciesHeader = document.createElement('th');
    const familyHeader = document.createElement('th');
    const traitNameHeader = document.createElement('th');
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
    speciesHeader.innerHTML = '<span>Species</span';
    familyHeader.innerHTML = '<span>Family</span>';
    traitNameHeader.innerHTML = '<span>Key trait</span>';
    filterHeader.appendChild(checkbox); 
    imageHeader.innerHTML = '<div></div>';
    if(wide) {        
        headerRow.appendChild(imageHeader);
        headerRow.appendChild(speciesHeader);    
        headerRow.appendChild(familyHeader);
        headerRow.appendChild(traitNameHeader);
    } else {
        headerRow.appendChild(imageHeader);    
        headerRow.appendChild(speciesHeader);     
    }
    headerRow.appendChild(filterHeader);      

    tbody.insertBefore(headerRow, tbody.children[0]);

    const tfoot = document.createElement('tfoot');
    const footerRow = document.createElement('tr');
    footerRow.classList.add('table-footer');

    const imageFooter = document.createElement('td');
    const speciesFooter = document.createElement('td');
    const familyFooter = document.createElement('td');
    const traitNameFooter = document.createElement('td');
    const filterFooter = document.createElement('td');

    imageFooter.innerHTML = '<div></div>';
    speciesFooter.innerHTML = '<div></div>';
    familyFooter.innerHTML = '<div></div>';

    filterFooter.innerHTML = '<div></div>';

    if(wide) {
        footerRow.appendChild(imageFooter);
        footerRow.appendChild(speciesFooter);
        footerRow.appendChild(familyFooter);
        footerRow.appendChild(traitNameFooter);
    } else {
        footerRow.appendChild(imageFooter);
        footerRow.appendChild(speciesFooter);
    }
    footerRow.appendChild(filterFooter);

    tfoot.appendChild(footerRow);
    // table.appendChild(tfoot);

    utils.makeSortable(document);    
}