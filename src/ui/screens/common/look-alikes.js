import * as R from 'ramda';

import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import { imageSideBySlider } from 'ui/screens/common/image-slider';
import { imageUseCases, scaleImage } from 'ui/helpers/image-handlers';
import { lookalikeDescriptions } from 'api/snapdragon/look-alike-descriptions';
import { firestore } from 'api/firebase/firestore';
// import { getLookalikeTraitProperties } from 'ui/helpers/traits-handler';

import audioMediaTemplate from 'ui/screens/common/audio-media-template.html';
import visualComparisonTemplate from 'ui/screens/common/look-alikes-link-template.html';

export const lookalikeSpecies = (item, config, rootNode = document) => {
    
    // const lookalikes = getLookalikeTraitProperties(item);
    const lookalikes = item.traits.lookalikes;

    if(lookalikes) {

        const speciesComparisonLink = rootNode.querySelector('.js-compare-species-link');
        const matchTemplate = document.createElement('template');
              matchTemplate.innerHTML = visualComparisonTemplate;
        const lookalikeParent = rootNode.querySelector('.js-lookalikes');

        const slides = [];
        const names = [];
        const scientificNames = [];

        if(!speciesComparisonLink) return;

        async function renderLookalikes() {

            const readyLookalikesForRendering = async () => {
                
                for (let lookalike of lookalikes) {

                    lookalike = lookalike.lookalike ? lookalike.lookalike.name : lookalike;

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
                    });
    
                    slides.push({ id: lookalikeItem.name, images });
                };
            };

            await readyLookalikesForRendering();

            if(slides.length === 0) return;

            renderTemplate({slides, names: names.join(', ')}, matchTemplate.content, lookalikeParent);

            speciesComparisonLink.classList.remove('hide');

            const getTrait = async (itemName, parent) => {
    
                const item = await firestore.getSpeciesByName(itemName);
                    
                if(item.taxonomy.class.toLowerCase() === 'aves') {
    
                    if(item.traits && Object.keys(item.traits).length === 0) return;
    
                    const xcID = item.traits['song'].value;
    
                    if(!xcID) return;
        
                    const mp3 = `./songs/${xcID}.mp3`;
    
                    const template = document.createElement('template');
                          template.innerHTML = audioMediaTemplate;
                    
                    renderTemplate({ mp3, title: item.name }, template.content, parent);
                }
            }
    
            speciesComparisonLink.addEventListener('click', () => {
    
                const parent = document.querySelector('#imageComparisonModal .js-modal-image');            
                
                const lookalikes = lookalikeDescriptions.find(lookalikes => R.contains(item.name, lookalikes.ids));

                if(!lookalikes) return;

                imageSideBySlider(slides, parent, true, config);
                    
                lookalikes.species.forEach(sp => {
                    const identifier = `.description_${sp.id.replace(' ', '_')}`;
                    const description = document.querySelector(identifier);
                          description.innerHTML = sp.description;
                    getTrait(sp.id, document.querySelector(`${identifier} + div`));
                });
                
            });
        }

        renderLookalikes();   
    }
};