import { renderTemplate } from 'ui/helpers/templating';
import { DOM } from 'ui/dom';
import { mixedTraitHandler } from 'ui/screens/multichoice/landscape/mixed-trait/mixed-trait-handler';

import imagesTemplate from 'ui/screens/multichoice/landscape/mixed-trait/left/mixed-trait-images-template.html';

export const renderMixedTraitImages = collection => {

    const template = document.createElement('template');
    template.innerHTML = imagesTemplate;

    const parent = DOM.leftBody;
          parent.innerHTML = '';

    mixedTraitHandler.onTraitsReady((traits, requiredTrait) => {
        
        renderTemplate({ traits }, template.content, parent);

        const traitTiles = document.querySelectorAll('.js-tiles img');
              traitTiles.forEach(tile => mixedTraitHandler.onClickTileHandler(tile, requiredTrait));
    });
};