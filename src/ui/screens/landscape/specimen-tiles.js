import * as R from 'ramda';

import { utils } from 'utils/utils'; 
import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { modalImagesHandler } from 'ui/helpers/image-handlers';
import { renderTemplate } from 'ui/helpers/templating';
import landscapeTemplate from 'ui/screens/landscape/specimen-tiles-template.html';

export const renderSpecimenTiles = (collection) => {

    const item = collection.nextItem;

    if(!item) return;

    const { layout, config } = store.getState();

    let screen = layout.screens.find(el => el.name === 'specimen-images');

    if(layout.screens[0].name === 'command') screen = layout.screens[0].left;

    if(!screen) return;

    const template = document.createElement('template');

    template.innerHTML = landscapeTemplate;

    const images = R.take(4, utils.shuffleArray(item.images));

    const parent = DOM.leftBody;
    parent.innerHTML = '';

    renderTemplate({ images }, template.content, parent);

    modalImagesHandler(document.querySelectorAll('.js-tiles .square'), item, null, config);
};