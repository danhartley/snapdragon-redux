import * as R from 'ramda';

import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import { imageSideBySlider } from 'ui/screens/common/image-slider';
import { imageUseCases, scaleImage } from 'ui/helpers/image-handlers';
import { lookalikeDescriptions } from 'api/snapdragon/look-alike-descriptions';
import { firestore } from 'api/firebase/firestore';

import audioMediaTemplate from 'ui/screens/common/audio-media-template.html';
import visualComparisonTemplate from 'ui/screens/common/look-alikes-link-template.html';

export const lookalikeSpecies = (item, config, rootNode = document) => {
    
    const lookalikes = item.traits.lookalikes || item.traits['look-alikes'];

    if(lookalikes) {
        
        const matchTemplate = document.createElement('template');
              matchTemplate.innerHTML = visualComparisonTemplate;
        const lookalikeParent = rootNode.querySelector('.js-lookalikes');

        const slides = [];
        const names = [];
        const scientificNames = [];

        let species;

        async function renderLookalikes() {

            const readyLookalikesForRendering = async () => {
                
                console.log(lookalikes);

                species = [ ...lookalikes.map(lookalike => lookalike.lookalike), { name: item.name, description: lookalikes[0].description } ];

                for (let lookalike of species) {

                    const lookalikeItem = await firestore.getSpeciesByName(lookalike.name);

                    if(!lookalikeItem) return;
                    
                    lookalikeItem.vernacularName = itemProperties.getVernacularName(lookalikeItem, config);
                    names.push(lookalikeItem.vernacularName);
                    scientificNames.push(lookalikeItem.name);
    
                    const images = lookalikeItem.images.map((img, index) => { 

                        const url = scaleImage({ url: img.url }, imageUseCases.CAROUSEL, config);

                        return { 
                                index: index + 1, 
                                src: { ...img, url: url.medium },
                                url: url.medium,
                                itemName: lookalikeItem.name, 
                                itemCommon: lookalikeItem.vernacularName };
                    });
    
                    slides.push({ id: lookalikeItem.name, images });
                };
            };

            await readyLookalikesForRendering();

            if(slides.length === 0) return;

            lookalikeParent.innerHTML = '';

            renderTemplate({slides, names: names.join(', ')}, matchTemplate.content, lookalikeParent);

            const speciesComparisonLink = rootNode.querySelector('.js-compare-species-link');

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
                            
                imageSideBySlider(slides, parent, true, config);
                    
                species.forEach(lookalike => {
                    const identifier = `.description_${lookalike.name.replace(' ', '_')}`;
                    const description = document.querySelector(identifier);
                          description.innerHTML = lookalike.description;
                    getTrait(lookalike.name, document.querySelector(`${identifier} + div`));
                });
                
            });
        }

        renderLookalikes();   
    }
};