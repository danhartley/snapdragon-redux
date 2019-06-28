import * as R from 'ramda';

import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { renderCard } from 'ui/screens/cards/card';
import { renderTemplate } from 'ui/helpers/templating';
import { firestore } from 'api/firebase/firestore';

import speciesGridTemplate from 'ui/screens/home/species-grid-template.html';

export const renderSpeciesGrid = () => {

    const { layout } = store.getState();

    const species = layout && layout.screens[1] && layout.screens[1].name === 'birdsong' 
                ? firestore.getSpecies().filter(species => species.taxonomy).filter(species => species.taxonomy.class.toLowerCase() === 'aves')
                : firestore.getSpecies();

    const imageCount = 40;

    const speciesImages = R.take(imageCount, utils.shuffleArray(species).map(sp => {
        return { images: sp.images, itemName: sp.name };
    }));

    const images = [];
    let counter = 0;

    speciesImages.forEach(si => {
        
        if(si.images.length > 0 && si.images[0].url) {
            if(si.images[0].url.indexOf('.jpg') > -1) {
                si.images[0].small = si.images[0].url.replace('.jpg', '.260x190.jpg');
            } else {
                si.images[0].small = `${si.images[0].url}.260x190.jpg`;
            }
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

    const cardModal = document.querySelector('#cardModal .js-modal-body');
    document.querySelectorAll('.species-grid img').forEach(image => {
        image.addEventListener('click', event => {
            const name = event.target.dataset.itemName;
            renderCard({ items: species, name: 'Snapdragon specimen' }, 'MODAL', species.find(i => i.name === name), cardModal, false);
        });
    });
};