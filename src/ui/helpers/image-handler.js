import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { itemProperties } from 'ui/helpers/data-checking';
import { imageSlider } from 'ui/screens/common/image-slider';

const stripImageUrlOfScaleAndPrefix = url => {
    const prefix = 'https://content.eol.org/data/media/';
    if(!url || typeof url === 'object') return '';
    url = url.replace('.260x190.jpg', '');
    url = url.replace('.98x68.jpg', '');
    url = url.replace('.jpg', '');
    url = url.replace(prefix, '');
    return url;
};

export const imageUseCases = {
    SPECIES_LIST: 'Species list',
    SPECIES_CARD: 'Species card',
    TAXON_CARD: 'Taxon card',
    SPECIES_SPECIMENS: 'Species specimens',
    NON_TAXON_CARD: 'Non-taxon card',
    VISUAL_MATCH: 'Visual match',
    MIXED_SPECIMENS: 'Mixed specimens',
    CAROUSEL: 'Carousel',
    TEXT_ENTRY: 'Text entry',
    ACTUAL_SIZE: 'Actual size',
    SPECIES_GRID: 'Species grid'
}

export const denormaliseImages = images => {
    const denormalisedImages = images.map(image => {
        image.photographersName = image.photographer ? image.photographer.full_name || '' : '';
        return image;
    });
    return denormalisedImages;
};

export const imageMatch = (src1, src2) => {
    if(!src2) return false;
    src1 = stripImageUrlOfScaleAndPrefix(src1);
    src2 = stripImageUrlOfScaleAndPrefix(src2);
    const isActiveImage = src1 === src2;
    return isActiveImage;
};

export const prepImageForCarousel = (image, index, item, config, useCase) => {
    let img = { 
        index: index + 1, 
        ...image,
        url: scaleImage(image, useCase, config).medium,
        itemName: item.name,
        itemCommon: item.itemCommon,
        rightsHolder: image.rightsHolder || '',
        photographersName : image.photographer ? image.photographer.full_name || '' : ''            
    };
    if(image.src) {
        img = { ...img, ...image.src };
    }
    return img;
};

export const prepImagesForCarousel = (item, config, useCase) => {
    const images = item.images.map((image, index) => { 
        return prepImageForCarousel(image, index, item, config, useCase);
    });
    return images;
};

export const scaleImage = (image, useCase, config) => {

    if(image.url.indexOf('medium') > -1) {
        image.large = `https://static.inaturalist.org/photos/${image.url}`;
        image.medium = image.url.replace('medium', 'small');
        image.medium = `https://static.inaturalist.org/photos/${image.medium}`;
        image.small = image.url.replace('medium', 'thumb');
        image.small = `https://static.inaturalist.org/photos/${image.small}`;
        return image;
    } else {
        image.url = stripImageUrlOfScaleAndPrefix(image.url);
        image.large = `https://content.eol.org/data/media/${image.url}.jpg`;
        image.medium = `https://content.eol.org/data/media/${image.url}.260x190.jpg`;
        image.small = `https://content.eol.org/data/media/${image.url}.98x68.jpg`;
        return image;
    }
    
};

export const modalImagesHandler = (images, item, collection, config, displayNameType) => {
    images.forEach(image => {
        modalImageHandler(image, item, collection, config, displayNameType);
    });
};

const handleImageSelectionFromList = (image, item, collection, config, displayNameType = 'binomial') => {

    const parent = document.querySelector('#imageModal .js-modal-image');
    const selectedItem = item || collection.items.find(item => item.name === image.dataset.itemName);
    let images = R.clone(selectedItem.images.map((image, index) => {
        selectedItem.vernacularName = itemProperties.getVernacularName(selectedItem, config);
        image = scaleImage(image, imageUseCases.CAROUSEL, config);
        return { ...image, itemName: selectedItem.name, itemCommon: selectedItem.vernacularName };
    }));
    images = denormaliseImages(images);
    const selectedItemImage = selectedItem.images.find(i => imageMatch(i.url,image.dataset.url));
    const selectedImage = { dataset: { ...image.dataset, ...selectedItemImage } };
    imageSlider({ config, images, parent, disableModal: false, image: selectedImage });
    let displayName = '';
    switch(displayNameType) {
        case 'biomial':
            displayName = selectedItem.name;
            break;
        case 'vernacular':
            displayName = selectedItem.vernacularName;
            break;
        case 'withheld':
            displayName = 'Species name withheld';
            break;
        default:
            displayName = `<span>${selectedItem.vernacularName}</span> <span class="latin-name">${selectedItem.name}</span>`;
    }
    DOM.modalImageTitle.innerHTML = displayName;
};

export const modalImageHandler = (image, item, collection, config, displayNameType = 'binomial') => {
    image.addEventListener('click', e => {
        if(!item) return;
        handleImageSelectionFromList(image, item, collection, config, displayNameType);        
    }, true);
};
