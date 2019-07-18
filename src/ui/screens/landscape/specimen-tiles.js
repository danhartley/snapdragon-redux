import * as R from 'ramda';

import { utils } from 'utils/utils'; 
import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { renderTemplate } from 'ui/helpers/templating';
import { modalImagesHandler } from 'ui/helpers/image-handlers';
import { imageUseCases, prepImagesForCarousel, prepImageForCarousel } from 'ui/helpers/image-handlers';
import { renderSpeciesGrid } from 'ui/screens/home/species-grid';

import specimensTemplate from 'ui/screens/landscape/specimen-tiles-template.html';

export const renderSpecimenTiles = collection => {

    const { layout } = store.getState();

    const item = collection.nextItem;

    if(!item) return;

    layout.screens[1] && layout.screens[1].name === 'birdsong' ? renderSpeciesGrid() : renderItemSpecimenTiles(item);
};

const renderItemSpecimenTiles = item => {
    
    const { config, collection, layout } = store.getState();

    let images, items; 
    
    const familes = [ 'family-strips', 'family', 'taxon-card' ];

    const number = 6;

    const collectionItems = collection.allItems || collection.items;

    if(R.contains(layout.screens[1].name, familes)) {
        images = R.take(number, R.flatten(collectionItems.filter(i => i.family.name.toLowerCase() === item.taxonomy.family.toLowerCase()).map(i => {
            return { images: i.images, item: { name: i.name, itemCommon: i.names[0].vernacularName, vernacularName: i.names[0].vernacularName, names: i.names } };
        })));

        if(images.length < number) {
            let required = number - images.length;
            let pool = images.map(image => {
                const item = collectionItems.find(i => i.name === image.item.name);
                return {
                    images: item.images,
                    item: { 
                        name: item.name, 
                        itemCommon: item.names[0].vernacularName, 
                        vernacularName: item.names[0].vernacularName, 
                        names: item.names 
                    }
                }
            });

            const pooledImages = R.flatten(pool);
            pooledImages.forEach(pooledImage => {
                pooledImage.images.forEach(image => {
                    images.push({images: utils.shuffleArray(pooledImage.images), item: pooledImage.item});
                })                
            });
        }

        images = R.take(number, utils.shuffleArray(images));

        items = images.map(image => image.item);
        items.forEach(i => {
            const itemName = i.name;
            i.images = collectionItems.find(i => i.name === itemName).images;
        });
        images = images.map((image, index) => {
            return prepImageForCarousel(image.images[0], index, image.item, config, imageUseCases.SPECIES_CARD);
        });        
    } else {
        images = R.take(6, utils.shuffleArray(R.clone(item.images)));
        images = prepImagesForCarousel({ name: item.name, itemCommon: item.itemCommon, images }, config, imageUseCases.SPECIES_CARD);
        items = [item];
    }

    renderSpecimenImageTiles({ items: items }, images);
};

const renderSpecimenImageTiles = (collection, images) => {

    const { layout, config } = store.getState();

    const acceptableScreens = [ 'specimen-images', 'trait-images' ]; // lookalike options?

    let screen = layout.screens.find(screen => R.contains(screen.name, acceptableScreens));

    if(layout.screens[0].name === 'command') screen = layout.screens[0].left;

    if(!screen) return;

    const template = document.createElement('template');

    template.innerHTML = specimensTemplate;    

    const parent = DOM.leftBody;
    parent.innerHTML = '';

    renderTemplate({ images }, template.content, parent);

    modalImagesHandler(document.querySelectorAll('.js-tiles .square'), null, collection, config);
};