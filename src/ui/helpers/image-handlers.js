import { DOM } from 'ui/dom';
import { itemProperties } from 'ui/helpers/data-checking';
import { imageSlider } from 'ui/screens/common/image-slider';

export const modalImagesHandler = (images, item, collection, config, displayNameType) => {
    images.forEach(image => {
        modalImageHandler(image, item, collection, config, displayNameType);
    });
};

export const modalImageHandler = (image, item, collection, config, displayNameType = 'binomial') => {
    image.addEventListener('click', event => {
        const parent = document.querySelector('#imageModal .js-modal-image');
        const selectedItem = item || collection.items.find(item => item.name === image.dataset.itemname);
        const images = selectedItem.images.map((image, index) => {
            return { src: image, itemName: selectedItem.name, itemCommon: itemProperties.vernacularName(item, config) };
        });
        imageSlider(images, parent, false, image, config);
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
                displayName = `${itemProperties.vernacularName(selectedItem, config)} (${selectedItem.name})`;
        }
        DOM.modalImageTitle.innerHTML = displayName;
    })
};
