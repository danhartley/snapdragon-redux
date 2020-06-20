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
        const family = collectionItems.filter(i => i.family.name.toLowerCase() === item.taxonomy.family.toLowerCase());
        images = R.take(6, utils.shuffleArray(getImagesFromItemFamily(family, config, imageUseCases.SPECIES_CARD)));
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

    snapLog('renderSpecimenImageTiles, image medium values:', images.map(i => i.medium));

    renderTemplate({ images }, template.content, parent);

    modalImagesHandler(document.querySelectorAll('.js-tiles .square'), item, collection, config);
};

const getImagesFromItemFamily = (family, config, useCase) => {

    let itemImages, items;

    itemImages = R.flatten(family.map(i => {
        return { images: i.images, item: { name: i.name, itemCommon: i.names[0].vernacularName, vernacularName: i.names[0].vernacularName, names: i.names } };
    }));

    if (itemImages.length < 6) {
        
        let pool = itemImages.map(image => {
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
        let pooledImages = R.flatten(pool);
            pooledImages.forEach(pooledImage => {
                pooledImage.images.forEach(image => {
                    itemImages.push({ images: pooledImage.images, item: pooledImage.item });
                });
            });
    }

    items = itemImages.map(image => image.item);
    
    items.forEach(i => {
        const itemName = i.name;
        i.images = family.find(i => i.name === itemName).images;
    });

    const uniqueImages = [];

    const getUniqueImage = (image, index, uniqueImages) => {
        let uniqueImage = image.images.find(i => i.starred);
        if(uniqueImage) {
            uniqueImage = R.contains(uniqueImage.title, uniqueImages.map(i => i.title)) ? null : uniqueImage;
        }
        if(uniqueImage) {
            uniqueImages.push(uniqueImage);
            return uniqueImage;
        }
        else {
            uniqueImage = image.images[index];
            if(uniqueImage && !R.contains(uniqueImage.title, uniqueImages.map(i => i.title))) {
                uniqueImages.push(uniqueImage);
                return uniqueImage;
            }
        }
    }; 

    const familyImages = [];

    itemImages.forEach((image, index) => {
        let imageToPrep = getUniqueImage(image, index, uniqueImages);
        if(imageToPrep) {
            familyImages.push(prepImageForCarousel(imageToPrep, index, image.item, config, useCase));
        }
    });

    return familyImages;
}
