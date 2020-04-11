import * as R from 'ramda';

import { utils } from 'utils/utils'; 
import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { renderTemplate } from 'ui/helpers/templating';
import { modalImagesHandler } from 'ui/helpers/image-handler';
import { imageUseCases, prepImagesForCarousel, prepImageForCarousel, scaleImage } from 'ui/helpers/image-handler';

import specimensTemplate from 'ui/screens/landscape/specimen-tiles-template.html';

export const renderSpecimenTiles = collection => {

    const item = collection.nextItem;

    if(!item) return;

    renderItemSpecimenTiles(item);
};

const renderItemSpecimenTiles = item => {
    
    const { config, collection, layout } = store.getState();

    const hasTiles = layout.itemIndex === layout.prevItemIndex && !!document.querySelector('.js-tiles');

    if(hasTiles) return;

    const familes = [ 'family-strips', 'family', 'taxon-card' ];

    const collectionItems = collection.allItems || collection.items;

    let images, items;
    
    if (R.contains(layout.screens[1].name, familes)) {        
        images = getImagesFromItemFamily(collectionItems.filter(i => i.family.name.toLowerCase() === item.taxonomy.family.toLowerCase()), item, config);
        items = images.map(image => collectionItems.find(item => item.name === image.itemName));
    } else {
        images = R.take(6, utils.shuffleArray(R.clone(item.images)));
        images = prepImagesForCarousel({ name: item.name, itemCommon: item.itemCommon, images }, config, imageUseCases.SPECIES_CARD);
        items = [item];
    }

    images = images.map(image => {
        return scaleImage(image, imageUseCases.VISUAL_MATCH, config);
    });

    renderSpecimenImageTiles({ items: items }, images, item);
};

const renderSpecimenImageTiles = (collection, images, item) => {

    const { layout, config } = store.getState();

    const acceptableScreens = [ 'specimen-images', 'trait-images' ]; // lookalike options?

    let screen = layout.screens.find(screen => R.contains(screen.name, acceptableScreens));

    if(!screen) return;

    const template = document.createElement('template');

    template.innerHTML = specimensTemplate;    

    const parent = DOM.leftBody;
          parent.innerHTML = '';

    renderTemplate({ images }, template.content, parent);

    modalImagesHandler(document.querySelectorAll('.js-tiles .square'), item, collection, config);
};

const getImagesFromItemFamily = (family, item, config) => {

    let images, number = 6, items, uniqueItems;

    images = R.take(number, R.flatten(family.map(i => {
        return { images: i.images, item: { name: i.name, itemCommon: i.names[0].vernacularName, vernacularName: i.names[0].vernacularName, names: i.names } };
    })));

    if (images.length < number) {
        let required = number - images.length;
        let pool = images.map(image => {
            const item = family.find(i => i.name === image.item.name);
            return {
                images: item.images,
                item: {
                    name: item.name,
                    itemCommon: item.names[0].vernacularName,
                    vernacularName: item.names[0].vernacularName,
                    names: item.names
                }
            };
        });
        const pooledImages = R.flatten(pool);
        pooledImages.forEach(pooledImage => {
            pooledImage.images.forEach(image => {
                images.push({ images: utils.shuffleArray(pooledImage.images), item: pooledImage.item });
            });
        });
    }

    items = images.map(image => image.item);
    
    uniqueItems = [...new Set(items.map(i => i.name))];
    
    switch (uniqueItems.length) {
        case 1:
            number = 1;
            break;
        case 2:
            number = 2;
            break;
        case 3:
            number = 3;
            break;
        default:
            number = 6;
    }
    
    images = R.take(number, utils.shuffleArray(images));
    
    items = items.filter(i => {
        const isTrue = R.contains(i.name, uniqueItems);
        uniqueItems.splice(0, 1);
        return isTrue;
    });
    
    items.forEach(i => {
        const itemName = i.name;
        i.images = family.find(i => i.name === itemName).images;
    });
    
    if (items.length === 1) {
        images = images.map((image, index) => {
            return prepImageForCarousel(image.images[index], index, image.item, config, imageUseCases.SPECIES_CARD);
        });
    }
    else {
        images = images.map((image, index) => {
            return prepImageForCarousel(item.images.find(i => i.starred) || image.images[index], index, image.item, config, imageUseCases.SPECIES_CARD);
        });
    }

    return images;
}
