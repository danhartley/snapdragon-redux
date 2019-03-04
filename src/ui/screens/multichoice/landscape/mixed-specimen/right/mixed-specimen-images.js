import * as R from 'ramda';

import { store } from 'redux/store';
import { utils } from 'utils/utils';
import { imageUseCases, scaleImage } from 'ui/helpers/image-handlers';
import { DOM } from 'ui/dom';
import { iconicTaxa, matchTaxon, matchTaxonKey } from 'api/snapdragon/iconic-taxa';
import { renderTemplate } from 'ui/helpers/templating';
import specimensTemplate from 'ui/screens/multichoice/landscape/mixed-specimen/right/mixed-specimen-images-template.html';

export const renderMixedSpecimenImages = collection => {

    const { config } = store.getState();

    const item = collection.nextItem;

    if(!item) return;

    const template = document.createElement('template');

    template.innerHTML = specimensTemplate;

    const parent = DOM.rightBody;
    parent.innerHTML = '';

    const itemRank = matchTaxon(item.taxonomy, iconicTaxa).toLowerCase();
    const itemPool = collection.allItems || collection.items;
    const clonedItems = R.clone(itemPool.filter(item => matchTaxonKey(item.taxonomy,[itemRank])));
    const mixedItems = R.take(5, utils.shuffleArray(clonedItems.filter(ci => ci.name !== item.name)));
    
    mixedItems.map(item => item.images.forEach(image => {
        image.url = scaleImage(image, imageUseCases.MIXED_SPECIMENS, config);
    }));

    let images = mixedItems.map(item => item.images[0]);

    images = mixedItems.map((item, index) => { 
        return { index: index + 1, ...item.images[0], itemName: item.name };
    } );
        
    renderTemplate({ images }, template.content, parent);
};