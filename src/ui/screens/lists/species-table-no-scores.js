import * as SD from 'api/traits/trait-types';

import { actions } from 'redux/actions/action-creators';
import { DOM } from 'ui/dom';
import { utils } from 'utils/utils';
import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import { imageUseCases, scaleImage } from 'ui/helpers/image-handlers';
import { iconicTaxa, matchTaxon, matchIcon } from 'api/snapdragon/iconic-taxa';

import speciesTemplate from 'ui/screens/lists/species-table-template.html';

export const buildTable = (collection, config, enums) => {

    const template = document.createElement('template');

    const wide = window.matchMedia("(min-width: 1024px)").matches;

    const getTraitName = (item, enums) => {
        let traitName = '';        
        let keyTratLinkClass = 'capitalise underline-link js-key-trait-link';
        item.taxonomy.phylum = item.taxonomy.phylum || '';
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
        
        item.image = utils.shuffleArray(item.images)[0];
        item.license = item.image.license;
        item.url = scaleImage(item.image, imageUseCases.SPECIES_LIST, config);
        item.rightsHolder = item.image.rightsHolder || 'Public domain';
        item.source = item.image.source;

        item.binomial = item.name;
        item.shortName = itemProperties.trimLatinName(item.name);
        const { traitName, keyTratLinkClass } = getTraitName(item, enums);
        const keyTrait = itemProperties.getActiveTrait(item, [{ name: traitName, formatter: trait => trait.value }]);
        item.keyTrait = keyTrait.indexOf(',') > 0 ? keyTrait.split(',')[0] : keyTrait;
        item.keyTratLinkClass = keyTratLinkClass;
        item.familyLinkClass = item.family
            ? 'capitalise underline-link js-taxon-card-link' 
            : 'js-taxon-card-link no-pointer-events';
        if(item.taxonomy && item.taxonomy.order) {
            item.orderLinkClass = item.order
                ? 'capitalise underline-link js-taxon-card-link' 
                : 'js-taxon-card-link no-pointer-events';
        } else { item.orderLinkClass = 'js-taxon-card-link'; }
        item.taxonomy = item.taxonomy || { family: '', order: ''}
        
        item.iconicTaxon = matchTaxon(item.taxonomy, iconicTaxa).value;

        if(item.iconicTaxon === 'fungi') {
            item.iconicTaxonIcon = 'hide';
            item.hideFungiIcon = '';
        } else {
            item.iconicTaxonIcon = matchIcon(item.taxonomy, iconicTaxa);
            item.hideFungiIcon = 'hide';
        }
    });

    let parent = config.isPortraitMode ? DOM.rightBody : DOM.leftBody;
    parent.innerHTML = '<div class="snapdragon-container species-list js-species-list"></div>';
    parent = parent.querySelector('.snapdragon-container.js-species-list');
    template.innerHTML = speciesTemplate;

    renderTemplate({ collection }, template.content, parent);

    const keyTraits = document.querySelectorAll('.js-key-trait-link');

    keyTraits.forEach(vn => {        
        const keyTrait = vn.dataset.keyTrait;
        const span = document.createElement('span');
        switch(keyTrait) {                
            case SD.enums.howEdible.CHOICE:
                span.innerHTML = '<span class="icon choice"></span>';
                vn.append(span);
                break;
            case SD.enums.howEdible.EDIBLE:
                span.innerHTML = '<span class="icon edible"></span>';
                vn.append(span);
                break;
            case SD.enums.howEdible.INEDIBLE:
                span.innerHTML = '<span class="icon inedible"></span>';
                vn.append(span);
                break;
            case SD.enums.howEdible.POISONOUS:
            case SD.enums.howEdible.DEADLY:
                span.innerHTML = '<span class="icon toxic"></span>';
                vn.append(span);
                break;
        }
    });

    const tbody = document.querySelector('.species-table tbody');
    
    const headerRow = document.createElement('tr');
          headerRow.classList.add('table-header');
    const imageHeader = document.createElement('th');
    const speciesHeader = document.createElement('th');
    const familyHeader = document.createElement('th');
    const traitNameHeader = document.createElement('th');
    const iconicTaxonHeader = document.createElement('th');
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
    familyHeader.innerHTML = '<span>Family</span><span>Order</span>';
    traitNameHeader.innerHTML = '<span>Feature</span>';
    iconicTaxonHeader.innerHTML = '<span><i class="fas fa-sliders-h"></i></span>';
    filterHeader.appendChild(checkbox); 
    imageHeader.innerHTML = '<span><i class="fas fa-undo"></i></span>';
    // imageHeader.innerHTML = '<div></div>';
    if(wide) {        
        headerRow.appendChild(imageHeader);
        headerRow.appendChild(speciesHeader);    
        headerRow.appendChild(familyHeader);
        headerRow.appendChild(traitNameHeader);
        headerRow.appendChild(iconicTaxonHeader);
    } else {
        headerRow.appendChild(imageHeader);    
        headerRow.appendChild(speciesHeader);     
        headerRow.appendChild(iconicTaxonHeader);
    }
    headerRow.appendChild(filterHeader);      

    tbody.insertBefore(headerRow, tbody.children[0]);

    const callback = names => {
        const sortedItems = [];
        names.forEach(name => {
            collection.items.forEach(item => {
                if(item.name === name) {
                    sortedItems.push(item);
                }
            });
        });
    
        actions.boundUpdateCollectionItems(sortedItems);        
    };

    utils.makeSortable(document, callback, wide);
}
