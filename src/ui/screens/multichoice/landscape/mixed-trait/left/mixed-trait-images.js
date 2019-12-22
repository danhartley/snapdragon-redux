import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { DOM } from 'ui/dom';
import { mixedTraitHandler } from 'ui/screens/multichoice/landscape/mixed-trait/mixed-trait-handler';

import imagesTemplate from 'ui/screens/multichoice/landscape/mixed-trait/left/mixed-trait-images-template.html';

export const renderMixedTraitImages = collection => {

    const { layout } = store.getState();

    const template = document.createElement('template');
          template.innerHTML = imagesTemplate;

    const parent = DOM.leftBody;
            parent.innerHTML = '';
    
    renderTemplate({ traits: layout.traits }, template.content, parent);

    const traitTiles = document.querySelectorAll('.js-tiles div');
    traitTiles.forEach(tile => {
        if(tile.querySelector('img').src.indexOf('png') > -1) {
        traitTiles.forEach(tile => tile.classList.add('png'));
        }
    });

    if(layout.requiredTraits.length > 1) {
        traitTiles.forEach(tile => tile.classList.add('multiple'));
    }

    traitTiles.forEach(tile => mixedTraitHandler.onClickTileHandler(tile, layout.requiredTraits, traitTiles));
};