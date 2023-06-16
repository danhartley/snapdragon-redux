import * as R from 'ramda';

import { utils } from 'utils/utils';
import { subscription } from 'redux/subscriptions';
import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { renderCard } from 'ui/screens/cards/card';
import { renderTemplate } from 'ui/helpers/templating';
import { firestore } from 'api/firebase/firestore';
import { scaleImage, imageUseCases } from 'ui/helpers/image-handlers';

import speciesGridTemplate from 'ui/screens/home/species-grid-template.html';

export const renderSpeciesGrid = () => {

    // subscription.remove(subscription.getByName('renderSpeciesGrid'));

    const init = async () => {

        const { layout, collection } = store.getState();

        // const species = layout && layout.screens[1] && layout.screens[1].name === 'birdsong' 
        //             ? firestore.getAllSpecies().filter(species => species.taxonomy).filter(species => species.taxonomy.class.toLowerCase() === 'aves')
        //             : firestore.getAllSpecies();

        // const species = collection.items;

        const imageCount = 40;

        const speciesNames = await firestore.getSpeciesNames();

        const randomSpecies = speciesNames[0].random_species;

        const speciesImages = randomSpecies.map(sp => {
            return { images: sp.images, itemName: sp.name };
        });
        
        const images = [];
        let counter = 0;

        speciesImages.forEach(si => {
            
            if(!si.images) return;

            if(si.images.length > 0 && si.images[0].url) {
                const image = scaleImage(si.images[0], imageUseCases.SPECIES_GRID);
                if(counter < imageCount) {
                    image.itemName = si.itemName;
                    images.push(image);
                    counter++;
                }            
            }
        });

        const template = document.createElement('template');
        template.innerHTML = speciesGridTemplate;

        DOM.rightBody.innerHTML = '';

        renderTemplate({ images }, template.content, DOM.rightBody);

        const cardModal = document.querySelector('#cardModal .js-modal-body');
        document.querySelectorAll('.species-grid img').forEach(image => {
            image.addEventListener('click', event => {
                const name = event.target.dataset.itemName;
                renderCard({ items: species, name: 'Snapdragon specimen' }, 'MODAL', species.find(i => i.name === name), cardModal, false);
            });
        });
    };

    init();
};