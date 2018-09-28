import * as R from 'ramda';

import { utils } from 'utils/utils'; 
import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { modalImagesHandler } from 'ui/helpers/handlers';
import { renderTemplate } from 'ui/helpers/templating';
import mixedSpecimenTemplate from 'ui/screens/multichoice/mixed-specimen-tiles-template.html';
import { getRandomItems } from 'ui/screens/multichoice/mixed-specimen-shared';

export const renderMixedSpecimenTiles = (collection) => {

    const item = collection.nextItem;

    if(!item) return;

    const template = document.createElement('template');

    template.innerHTML = mixedSpecimenTemplate;

    const items = getRandomItems(item);

    const images = items.map((item, index) => { 
        return { index: index + 1, src: item.images[0], itemName: item.name };
    } );


    const parent = DOM.leftBody;
    parent.innerHTML = '';

    renderTemplate({images}, template.content, parent);

    modalImagesHandler(document.querySelectorAll('.js-tiles .square'), null, collection);
};