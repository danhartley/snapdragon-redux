import { renderTemplate } from 'ui/helpers/templating';
import { DOM } from 'ui/dom';
import { mixedTraitHandler } from 'ui/screens/multichoice/landscape/mixed-trait/mixed-trait-handler';

import imagesTemplate from 'ui/screens/multichoice/landscape/mixed-trait/left/mixed-trait-images-template.html';

export const renderMixedTraitImages = collection => {

    const template = document.createElement('template');
          template.innerHTML = imagesTemplate;

    mixedTraitHandler.onTraitsReady((traits, requiredTraits) => {

        const parent = DOM.leftBody;
        parent.innerHTML = '';
        
        renderTemplate({ traits }, template.content, parent);

        const traitTiles = document.querySelectorAll('.js-tiles div');
        if(requiredTraits.length > 1) {
            traitTiles.forEach(tile => tile.classList.add('multiple'));
        }

        const traitTileImages = document.querySelectorAll('.js-tiles img');
              traitTileImages.forEach(tile => mixedTraitHandler.onClickTileHandler(tile, requiredTraits));
    });
};