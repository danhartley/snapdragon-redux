import * as R from 'ramda';

import { utils } from 'utils/utils';
import { DOM } from 'ui/dom';
import { species } from 'api/species';
import { renderTemplate } from 'ui/helpers/templating';
import speciesGridTemplate from 'ui/screens/home/species-grid-template.html';

export const renderSpeciesGrid = () => {

    const speciesImages = R.take(30, utils.shuffleArray(species).map(sp => sp.images));

    const images = [];
    let counter = 0;

    speciesImages.forEach(imgs => {
        
        if(imgs.length > 0 && imgs[0].thumb && imgs[0].thumb.indexOf('98x68') > 0) {
            imgs[0].small = imgs[0].thumb.replace('98x68', '260x190');
            if(counter < 25) {
                images.push(imgs[0]);
                counter++;
            }            
        }
    });

    const template = document.createElement('template');
    template.innerHTML = speciesGridTemplate;

    DOM.leftBody.innerHTML = '';

    renderTemplate({ images }, template.content, DOM.leftBody);
};