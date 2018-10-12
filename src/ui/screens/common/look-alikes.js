import * as R from 'ramda';

import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import { imageSideBySlider } from 'ui/screens/common/image-slider';
import visualComparisonTemplate from 'ui/screens/common/look-alikes-link-template.html';
import { fungiDescriptions } from 'api/traits/fungi-traits';

export const lookALikes = (collection, item, traits, config) => {

    const lookalikes = itemProperties.itemContextProperty(traits, item, 'look-alikes');

    if(lookalikes) {

        const matchTemplate = document.createElement('template');
        matchTemplate.innerHTML = visualComparisonTemplate;
        const lookalikeNode = document.querySelector('.js-lookalikes');

        const slides = [];

        let images = item.images.map((img, index) => { 
            return { index: index + 1, src: img, itemName: item.name, itemCommon: itemProperties.vernacularName(item, config) };
        } );

        slides.push({ images });

        const names = [];

        lookalikes.forEach(lookalike => {
            const lookalikeItem = collection.items.find(item => item.name === lookalike);
            if(!lookalikeItem) return;
            names.push(itemProperties.vernacularName(lookalikeItem, config));
            images = lookalikeItem.images.map((img, index) => { 
                return { index: index + 1, src: img, itemName: lookalikeItem.name, itemCommon: itemProperties.vernacularName(lookalikeItem, config) };
            } );
            slides.push({ images });
        });

        if(slides.length === 1) return;

        renderTemplate({slides}, matchTemplate.content, lookalikeNode);

        document.querySelector('.js-compare-species-label').innerHTML = `Look-alikes: ${names.join(', ')}`;
        
        if(!config.isLandscapeMode) return;

        document.querySelector('.js-compare-species-link').addEventListener('click', ()=> {
            const parent = document.querySelector('#imageComparisonModal .js-modal-image');            
            imageSideBySlider(slides, parent, true, config);
        });

        let description = fungiDescriptions.find(trait => trait.type === 'lookalike' && R.contains(item.name, trait.ids));
        description = description ? description.description : '';

        document.querySelector('#imageComparisonModal .js-comparison-description').innerHTML = description;
    }
};