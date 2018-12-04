import { DOM } from 'ui/dom';
import { itemProperties } from 'ui/helpers/data-checking';
import { imageSlider } from 'ui/screens/common/image-slider';

export const imageUseCases = {
    SPECIES_LIST: 'Species list',
    SPECIES_CARD: 'Species card',
    SPECIES_SPECIMENS: 'Species specimens',
    NON_TAXON_CARD: 'Non-taxon card',
    VISUAL_MATCH: 'Visual match',
    MIXED_SPECIMENS: 'Mixed specimens',
    CAROUSEL: 'Carousel',
    TEXT_ENTRY: 'Text entry'
}

export const denormaliseImages = images => {
    const denormalisedImages = images.map(image => {
        image.photographersName = image.photographer ? image.photographer.full_name || '' : '';
        return image;
    });
    return denormalisedImages;
};

export const imageMatch = (elemSrc, src) => {
    if(!src) return false;
    return (elemSrc === src || elemSrc === src.replace('.98x68.jpg', '.jpg') || elemSrc === src.replace('.260x190.jpg', '.jpg'));
};

export const prepImagesForCarousel = (item, config, useCase) => {
    const images = item.images.map((image, index) => { 
        let img = { 
            index: index + 1, 
            ...image,
            ...{ url : scaleImage(image, useCase, config) },
            itemName: item.name,
            itemCommon: item.itemCommon,
            photographersName : image.photographer ? image.photographer.full_name || '' : ''            
        };
        if(image.src) {
            img = { ...img, ...image.src };
        }
        return img;
    });
    return images;
};

export const scaleImage = (image, useCase, config) => {

    if(!image.url) return '';

    switch(useCase) {
        case imageUseCases.SPECIES_LIST:
            return config.isLandscapeMode 
                ? image.url.replace('.jpg', '.260x190.jpg')
                : image.url.replace('.jpg', '.98x68.jpg');
        case imageUseCases.SPECIES_CARD:
        return config.isLandscapeMode 
            ? image.url.replace('.jpg', '.260x190.jpg')
            : image.url.replace('.jpg', '.260x190.jpg');
        case imageUseCases.NON_TAXON_CARD:
            return config.isLandscapeMode 
                ? image.url.replace('.jpg', '.260x190.jpg')
                : image.url.replace('.jpg', '.260x190.jpg');
        case imageUseCases.VISUAL_MATCH:
        case imageUseCases.TEXT_ENTRY:
            return config.isLandscapeMode 
            ? image.url
            : image.url.replace('.jpg', '.260x190.jpg');
        case imageUseCases.MIXED_SPECIMENS:
            return config.isLandscapeMode 
                ? image.url.replace('.jpg', '.260x190.jpg')
                : image.url.replace('.jpg', '.260x190.jpg');
        case imageUseCases.CAROUSEL:
            return config.isLandscapeMode 
                ? image.url ? image.url.replace('.jpg', '.260x190.jpg') : ''
                : image.url.replace('.jpg', '.260x190.jpg');
        default:
            return image.url;
    }
    
};

export const modalImagesHandler = (images, item, collection, config, displayNameType) => {
    images.forEach(image => {
        modalImageHandler(image, item, collection, config, displayNameType);
    });
};

export const modalImageHandler = (image, item, collection, config, displayNameType = 'binomial') => {
    image.addEventListener('click', event => {  
        if(!item && !collection.items) return;
        const parent = document.querySelector('#imageModal .js-modal-image');
        const selectedItem = item || collection.items.find(item => item.name === image.dataset.itemName);
        let images = selectedItem.images.map((image, index) => {
            selectedItem.vernacularName = itemProperties.getVernacularName(selectedItem, config);
            return { ...image, itemName: selectedItem.name, itemCommon: selectedItem.vernacularName };
        });
        images = denormaliseImages(images);
        const selectedItemImage = selectedItem.images.find(i => imageMatch(i.url,image.dataset.uniqueUrl));
        const selectedImage = { dataset: { ...image.dataset, ...selectedItemImage } };
        imageSlider(config, images, parent, false, selectedImage);
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
                displayName = `<span class="common-name">${selectedItem.vernacularName}</span> <span class="latin-name">(${selectedItem.name})</span>`;
        }
        DOM.modalImageTitle.innerHTML = displayName;        
    })
};
