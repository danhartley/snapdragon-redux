import { DOM } from 'ui/dom';
import { utils } from 'utils/utils';
import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import { imageUseCases, scaleImage } from 'ui/helpers/image-handler';
import { iconicTaxa, matchIcon } from 'api/snapdragon/iconic-taxa';

import speciesTemplate from 'ui/screens/lists/species-table-template.html';

export const buildTable = (collection, args) => {

    const { config, enums, overrideParent } = args;

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

    const getOrderLinkClass = item => {
        let orderLinkClass;
        if(item.taxonomy && item.taxonomy.order) {
            orderLinkClass = item.order
                ? 'capitalise underline-link js-taxon-card-link' 
                : 'js-taxon-card-link no-pointer-events';
        } else { orderLinkClass = 'js-taxon-card-link'; }
        return orderLinkClass;
    };

    const getIconicTaxonIcon = item => {
        let iconicTaxonIcon, hideFungiIcon;
        if(item.iconicTaxon.toLowerCase() === 'fungi') {
            iconicTaxonIcon = 'hide';
            hideFungiIcon = '';
        } else {
            iconicTaxonIcon = matchIcon(item.taxonomy, iconicTaxa);
            hideFungiIcon = 'hide';
        }
        return { iconicTaxonIcon, hideFungiIcon };
    };

    const itemImages = collection.items.map(item => { 

        let image = item.images.find(i => i.starred) || utils.shuffleArray(item.images)[0];
            image = scaleImage(image, imageUseCases.SPECIES_LIST, config);

        const { traitName, keyTratLinkClass } = getTraitName(item, enums);
        const { iconicTaxonIcon, hideFungiIcon } = getIconicTaxonIcon(item);

        const itemImage = {
            id: item.id,
            name: item.name,
            genus: item.taxonomy.genus,
            species: item.taxonomy.species,
            genusLinkClass: item.genus
                ? 'underline-link js-taxon-card-link' 
                : 'js-taxon-card-link no-pointer-events',
            shortName: itemProperties.trimLatinName(item.name),
            taxonomy: item.taxonomy,
            iconicTaxon: item.iconicTaxon,
            vernacularName: item.vernacularName,
            snapIndex: item.snapIndex,
            license: image.license,
            url: image.url,
            small: image.small,
            rightsHolder: image.rightsHolder || 'Public domain',
            source: image.source,
            shortName: itemProperties.trimLatinName(item.name),
            keyTrait: utils.capitaliseFirst(itemProperties.getActiveTrait(item, [{ name: traitName, formatter: trait => trait[0] }])) || '',
            keyTratLinkClass: keyTratLinkClass,
            familyLinkClass: item.family
                                ? 'capitalise underline-link js-taxon-card-link' 
                                : 'js-taxon-card-link no-pointer-events',
            orderLinkClass: getOrderLinkClass(item),
            taxonomy: item.taxonomy || { family: '', order: ''},
            iconicTaxonIcon,
            hideFungiIcon, 
            hasVideoClassName: !collection.hasVideo ? 'hide-important' : ''
        };

        return itemImage;
    });

    let parent = config.isPortraitMode ? DOM.rightBody : DOM.leftBody;
    if(!overrideParent) { // hacky!!
        parent.innerHTML = '<div class="snapdragon-container species-list js-species-list"></div>';
        parent = parent.querySelector('.snapdragon-container.js-species-list');
    }
    parent = overrideParent || parent;
    template.innerHTML = speciesTemplate;

    renderTemplate({ id: collection.id,itemImages }, template.content, parent);

    const keyTraits = document.querySelectorAll('.js-key-trait-link');

    keyTraits.forEach(vn => {        
        const keyTrait = vn.dataset.keyTrait;
        const span = document.createElement('span');
        switch(keyTrait) {                
            case enums.howEdible.CHOICE:
                span.innerHTML = '<span class="icon choice"></span>';
                vn.append(span);
                break;
            case enums.howEdible.EDIBLE:
                span.innerHTML = '<span class="icon edible"></span>';
                vn.append(span);
                break;
            case enums.howEdible.INEDIBLE:
                span.innerHTML = '<span class="icon inedible"></span>';
                vn.append(span);
                break;
            case enums.howEdible.POISONOUS:
            case enums.howEdible.DEADLY:
                span.innerHTML = '<span class="icon toxic"></span>';
                vn.append(span);
                break;
        }
    });

    const tbody = document.querySelector('.species-table tbody');

    if(!tbody) return;
    
    const headerRow = document.createElement('tr');
          headerRow.classList.add('table-header');
    const imageHeader = document.createElement('th');
    const speciesHeader = document.createElement('th');
    const familyHeader = document.createElement('th');
    const traitNameHeader = document.createElement('th');
    const iconicTaxonHeader = document.createElement('th');

    const accordionHeader = document.createElement('th');
          accordionHeader.classList.add('not-sortable');

    speciesHeader.innerHTML = '<span>Species</span';
    familyHeader.innerHTML = '<span>Family</span><span>Order</span>';
    traitNameHeader.innerHTML = '<span></span>';
    iconicTaxonHeader.innerHTML = '<span><i class="fas fa-sliders-h"></i></span>';
    imageHeader.innerHTML = overrideParent ? '' : '<span><i class="fas fa-undo"></i></span>';
    if(wide) {        
        headerRow.appendChild(imageHeader);
        headerRow.appendChild(speciesHeader);    
        headerRow.appendChild(familyHeader);
        headerRow.appendChild(iconicTaxonHeader);
        headerRow.appendChild(traitNameHeader);
    } else {
        headerRow.appendChild(imageHeader);    
        headerRow.appendChild(speciesHeader);
    }
    headerRow.appendChild(accordionHeader);

    tbody.insertBefore(headerRow, tbody.children[0]);

    const sortableCalback = () => {};

    utils.makeSortable(document, sortableCalback, wide);
}
