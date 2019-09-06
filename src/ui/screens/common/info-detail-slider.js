import { store } from 'redux/store';
import { firestore } from 'api/firebase/firestore';
import { linkedTaxa } from 'ui/screens/common/linked-taxa';
import { renderTemplate } from 'ui/helpers/templating';

import detailsTemplate from 'ui/screens/common/info-detail-slider-template.html';

export const renderInfoDetails = (item, activeTraitKey, activeTraitValue) => {

    const { config, collection } = store.getState();

    if(activeTraitKey.toLowerCase() === 'relationships' || activeTraitKey.toLowerCase() === 'lookalikes') {
        const mode = 'MODAL';
        const isInCarousel = true;
        linkedTaxa(item, config, document.querySelector('.js-info-box-details'), mode, isInCarousel, collection, activeTraitValue);
    } else {

        const details = firestore.getDefinition(activeTraitValue);

        const parent = document.querySelector('.js-info-box-details');

        if(!parent) return; // taxon info sliders

        parent.innerHTML = '';

        const detailsContainer = document.createElement('template');

        if(details) {
            details.forEach(detail => {
                detailsContainer.innerHTML = detailsTemplate;
                detail.imgClassName = detail.img ? detail.img.url === '' ? 'hide-important' : '' : 'hide-important';
                detail.img = detail.img || { url: '' }; 
            })
        } else {
            detailsContainer.innerHTML = '';
        }

        renderTemplate({ details }, detailsContainer.content, parent);
    }
};