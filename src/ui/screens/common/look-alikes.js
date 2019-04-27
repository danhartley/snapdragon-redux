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

export const lookALikes = (item, traits, config) => {

    const lookalikes = itemProperties.itemContextProperty(traits, item, 'look-alikes');

    if(lookalikes && lookalikes !== '') {

        const matchTemplate = document.createElement('template');
        matchTemplate.innerHTML = visualComparisonTemplate;
        const lookalikeParent = document.querySelector('.js-lookalikes');

        const slides = [];

        let images = item.images.map((img, index) => { 
            return { 
                index: index + 1, 
                src: { ...img, url: scaleImage({ url: img.url }, imageUseCases.CAROUSEL, config) },
                itemName: item.name, 
                itemCommon: item.vernacularName };
        } );

        slides.push({ images });

        const names = [];
        const scientificNames = [];

        lookalikes.forEach(lookalike => {
            const lookalikeItem = species.find(item => item.name === lookalike);
            if(!lookalikeItem) return;
            lookalikeItem.vernacularName = itemProperties.getVernacularName(lookalikeItem, config);
            names.push(lookalikeItem.vernacularName);
            scientificNames.push(lookalikeItem.name);
            images = lookalikeItem.images.map((img, index) => { 
                return { 
                        index: index + 1, 
                        src: { ...img, url: scaleImage({ url: img.url }, imageUseCases.CAROUSEL, config) },
                        itemName: lookalikeItem.name, 
                        itemCommon: lookalikeItem.vernacularName };
            } );
            slides.push({ images });
        });

        if(slides.length === 1) return;

        renderTemplate({slides, names: names.join(', ')}, matchTemplate.content, lookalikeParent);

        if(config.isPortraitMode) return;

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

        const speciesComparisonLink = document.querySelector('.js-compare-species-link');

        speciesComparisonLink.addEventListener('click', ()=> {

            const parent = document.querySelector('#imageComparisonModal .js-modal-image');            
            imageSideBySlider(slides, parent, true, config);
            const description = lookalikeDescriptions.find(trait => trait.type === 'lookalike' && R.contains(item.name, trait.ids) && !!scientificNames.find(name => R.contains(name, trait.ids)));
            const descriptions = description ? description.descriptions : '';

            const species1 = document.querySelector(`.description${1}`);
            const species2 = document.querySelector(`.description${2}`);
            const species3 = document.querySelector(`.description${3}`);

            species1.innerHTML = `<div>${descriptions[0]}</div><div></div>`;
            species2.innerHTML = `<div>${descriptions[1]}</div><div></div>`;

            getTrait(description.ids[0], species1.querySelector('div:nth-child(2)'));
            getTrait(description.ids[1], species2.querySelector('div:nth-child(2)'));

            if(species3) {
                species3.innerHTML = `<div>descriptions[2]</div><div></div>`;
                getTrait(description.ids[2], species3.querySelector('div:nth-child(2)'));
            }
        });        
    }
};