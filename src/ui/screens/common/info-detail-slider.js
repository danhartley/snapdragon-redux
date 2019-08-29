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

        const detail = firestore.getDefinition(activeTraitValue);

        const parent = document.querySelector('.js-info-box-details');

        if(!parent) return; // taxon info sliders

        parent.innerHTML = '';

        const details = document.createElement('template');

        if(detail) {
            details.innerHTML = detailsTemplate;
            detail.imgClassName = detail.img ? detail.img.url === '' ? 'hide-important' : '' : 'hide-important';
            detail.img = detail.img || { url: '' }; 
        } else {
            details.innerHTML = '';
        }

        renderTemplate({ detail }, details.content, parent);
    }
};