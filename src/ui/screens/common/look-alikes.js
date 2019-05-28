import * as R from 'ramda';

import { store } from 'redux/store';
import { getTraits } from 'api/traits/traits';
import audioMediaTemplate from 'ui/screens/common/audio-media-template.html';
import { species } from 'api/species';
import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import { imageSideBySlider } from 'ui/screens/common/image-slider';
import { imageUseCases, scaleImage } from 'ui/helpers/image-handlers';
import visualComparisonTemplate from 'ui/screens/common/look-alikes-link-template.html';
import { lookalikeDescriptions } from 'api/snapdragon/look-alike-descriptions';

export const lookALikes = (item, traits, config, rootNode = document) => {

    const lookalikes = itemProperties.itemContextProperty(traits, item, 'look-alikes');
          lookalikes.push(item.name);

    if(lookalikes.length > 1) {

        const matchTemplate = document.createElement('template');
        matchTemplate.innerHTML = visualComparisonTemplate;
        const lookalikeParent = rootNode.querySelector('.js-lookalikes');

        const slides = [];
        const names = [];
        const scientificNames = [];

        lookalikes.forEach(lookalike => {
            const lookalikeItem = species.find(item => item.name === lookalike);
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

        const getTrait = (itemName, parent) => {

            let { enums } = store.getState();

            const item = species.find(species => species.name === itemName);
                
            if(item.taxonomy.class.toLowerCase() === 'aves') {

                const traits = getTraits(enums);

                const bird = traits.find(bird => bird.name === item.name);

                if(!bird) return;

                const xcID = bird.traits.find(trait => trait.name === 'song').value;

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
            
            const lookalikes = lookalikeDescriptions.filter(lookalikes => lookalikes.type === 'lookalike').find(lookalikes => R.contains(item.name, lookalikes.ids));

            lookalikes.species.forEach(sp => {
                const identifier = `.description_${sp.id.replace(' ', '_')}`;
                const description = document.querySelector(identifier);
                      description.innerHTML = sp.description;
                getTrait(sp.id, document.querySelector(`${identifier} + div`));
            });
        });        
    }
};