import * as R from 'ramda';

import { store } from 'redux/store';
import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import { imageSideBySlider } from 'ui/screens/common/image-slider';
import { imageUseCases, scaleImage } from 'ui/helpers/image-handlers';
import { lookalikeDescriptions } from 'api/snapdragon/look-alike-descriptions';
import { firestore } from 'api/firebase/firestore';

import audioMediaTemplate from 'ui/screens/common/audio-media-template.html';
import visualComparisonTemplate from 'ui/screens/common/look-alikes-link-template.html';

export const lookalikeSpecies = (item, config, rootNode = document) => {

    // let lookalikes = item.traits.find(c => c.name === 'look-alikes');
    let lookalikes = [];

    for (let [key, value] of Object.entries(item.traits)) {
        if(key === 'look-alikes') lookalikes.push({key,value});
    }

    if(lookalikes.length > 0) {

        lookalikes = lookalikes.map(lookalike => lookalike.value.value);

        lookalikes.push(item.name);

        const matchTemplate = document.createElement('template');
              matchTemplate.innerHTML = visualComparisonTemplate;
        const lookalikeParent = rootNode.querySelector('.js-lookalikes');

        const slides = [];
        const names = [];
        const scientificNames = [];

        lookalikes.forEach(async lookalike => {
            const lookalikeItem = await firestore.getSpeciesByName(lookalike);
            if(!lookalikeItem) return;
            lookalikeItem.vernacularName = itemProperties.getVernacularName(lookalikeItem, config);
            names.push(lookalikeItem.vernacularName);
            scientificNames.push(lookalikeItem.name);
            const images = lookalikeItem.images.map((img, index) => { 
                return { 
                        index: index + 1, 
                        src: { ...img, url: scaleImage({ url: img.url }, imageUseCases.CAROUSEL, config) },
                        itemName: lookalikeItem.name, 
                        itemCommon: lookalikeItem.vernacularName };
            } );
            slides.push({ id: lookalikeItem.name, images });
        });

        renderTemplate({slides, names: names.join(', ')}, matchTemplate.content, lookalikeParent);

        const getTrait = async (itemName, parent) => {

            let { enums } = store.getState();

            const item = await firestore.getSpeciesByName(itemName);
                
            if(item.taxonomy.class.toLowerCase() === 'aves') {

                if(item.traits.length === 0) return;

                const xcID = item.traits.find(trait => trait.name === 'song').value;

                if(!xcID) return;
    
                const mp3 = `./songs/${xcID}.mp3`;

                const template = document.createElement('template');
                      template.innerHTML = audioMediaTemplate;
                
                renderTemplate({ mp3, title: item.name }, template.content, parent);
            }
        }

        const speciesComparisonLink = rootNode.querySelector('.js-compare-species-link');

        speciesComparisonLink.addEventListener('click', () => {

            const parent = document.querySelector('#imageComparisonModal .js-modal-image');            
            
            imageSideBySlider(slides, parent, true, config);
            
            const lookalikes = lookalikeDescriptions.find(lookalikes => R.contains(item.name, lookalikes.ids));

            lookalikes.species.forEach(sp => {
                const identifier = `.description_${sp.id.replace(' ', '_')}`;
                const description = document.querySelector(identifier);
                      description.innerHTML = sp.description;
                getTrait(sp.id, document.querySelector(`${identifier} + div`));
            });
            
        });        
    }
};