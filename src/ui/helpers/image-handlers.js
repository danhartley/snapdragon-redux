import { DOM } from 'ui/dom';
import { itemProperties } from 'ui/helpers/data-checking';
import { imageSlider } from 'ui/screens/common/image-slider';

const stripImageUrlOfScale = url => {
    if(!url) return '';
    url = url.replace('.260x190.jpg', '');
    url = url.replace('.98x68.jpg', '');
    url = url.replace('.jpg', '');
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
    ACTUAL_SIZE: 'Actual size'
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
    src1 = stripImageUrlOfScale(src1);
    src2 = stripImageUrlOfScale(src2);
    const isActiveImage = src1 === src2;
    return isActiveImage;
};

export const prepImageForCarousel = (image, index, item, config, useCase) => {
    let img = { 
        index: index + 1, 
        ...image,
        ...{ url : scaleImage(image, useCase, config) },
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

    image.url = stripImageUrlOfScale(image.url);

    switch(useCase) {
        case imageUseCases.SPECIES_LIST:
            return `${image.url}.98x68.jpg`;
        case imageUseCases.SPECIES_CARD:
        case imageUseCases.TAXON_CARD:            
        case imageUseCases.NON_TAXON_CARD:
        case imageUseCases.VISUAL_MATCH:
        case imageUseCases.TEXT_ENTRY:
        case imageUseCases.MIXED_SPECIMENS:
        case imageUseCases.CAROUSEL:
            return `${image.url}.260x190.jpg`;
        case imageUseCases.ACTUAL_SIZE:
            return `${image.url}.jpg`;
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
        const parent = document.querySelector('#imageModal .js-modal-image');
        const selectedItem = item || collection.items.find(item => item.name === image.dataset.itemName);
        let images = selectedItem.images.map((image, index) => {
            selectedItem.vernacularName = itemProperties.getVernacularName(selectedItem, config);
            image.url = scaleImage(image, imageUseCases.CAROUSEL, config);
            return { ...image, itemName: selectedItem.name, itemCommon: selectedItem.vernacularName };
        });
        images = denormaliseImages(images);
        const selectedItemImage = selectedItem.images.find(i => imageMatch(i.url,image.dataset.uniqueUrl));
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
    })
};
