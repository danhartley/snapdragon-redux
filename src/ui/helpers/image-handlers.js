import { DOM } from 'ui/dom';
import { itemProperties } from 'ui/helpers/data-checking';
import { imageSlider } from 'ui/screens/common/image-slider';

export const modalImagesHandler = (images, item, collection, displayNameType) => {
    images.forEach(image => {
        modalImageHandler(image, item, collection, displayNameType);
    });
};

export const modalImageHandler = (image, item, collection, displayNameType = 'binomial') => {
    image.addEventListener('click', event => {
        const parent = document.querySelector('#imageModal .js-modal-image');
        const selectedItem = item || collection.items.find(item => item.name === image.dataset.itemname);
        const images = selectedItem.images.map((image, index) => {
            return { src: image, itemName: selectedItem.name };
        });
        imageSlider(images, parent, false, image);
        let displayName = '';
        switch(displayNameType) {
            case 'biomial':
                displayName = selectedItem.name;
                break;
            case 'vernacular':
                displayName = itemProperties.vernacularName(item, config);
                break;
            case 'withheld':
                displayName = 'Species name withheld';
                break;
            default:
                displayName = selectedItem.name;
        }
        DOM.modalImageTitle.innerHTML = displayName;
    })
};
