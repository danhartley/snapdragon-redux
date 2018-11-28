import { DOM } from 'ui/dom';
import { itemProperties } from 'ui/helpers/data-checking';
import { imageSlider } from 'ui/screens/common/image-slider';
import { handleRightsAttribution } from 'ui/screens/common/rights-attribution';

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
            selectedItem.vernacularName = itemProperties.getVernacularName(selectedItem, config);
            return { ...image, itemName: selectedItem.name, itemCommon: selectedItem.vernacularName };
        });
        images.forEach(image => {
            image.photographersName = image.photographer ? image.photographer.full_name || '' : '';
        });
        const selectedItemImage = selectedItem.images.find(i => i.url === image.dataset.uniqueUrl);
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
        
        const activeNode = parent.querySelector('.imageSlider.carousel .carousel-item.active > div');        
        handleRightsAttribution(selectedItem, activeNode);
    })
};
