import * as R from 'ramda';

import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { species } from 'api/species';
import { renderCard } from 'ui/screens/cards/card';
import { renderTemplate } from 'ui/helpers/templating';
import speciesGridTemplate from 'ui/screens/home/species-grid-template.html';

export const renderSpeciesGrid = () => {

    const imageCount = 40;

    const speciesImages = R.take(imageCount, utils.shuffleArray(species).map(sp => {
        return { images: sp.images, itemName: sp.name };
    }));

    const images = [];
    let counter = 0;

    speciesImages.forEach(si => {
        
        if(si.images.length > 0 && si.images[0].url) {
            si.images[0].small = si.images[0].url.replace('.jpg', '.260x190.jpg');
            if(counter < imageCount) {
                si.images[0].itemName = si.itemName;
                images.push(si.images[0]);
                counter++;
            }            
        }
    });

    const template = document.createElement('template');
    template.innerHTML = speciesGridTemplate;

    DOM.leftBody.innerHTML = '';

    renderTemplate({ images }, template.content, DOM.leftBody);

    const speciesCardModal = document.querySelector('#speciesCardModal .js-modal-body');
    document.querySelectorAll('.species-grid img').forEach(image => {
        image.addEventListener('click', event => {
            const name = event.target.dataset.itemName;
            renderCard({ items: species, name: 'Snapdragon specimen' }, true, species.find(i => i.name === name), speciesCardModal, false);
        });
    });
};