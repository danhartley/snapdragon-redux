import { store } from 'redux/store';
import { firestore } from 'api/firebase/firestore';
import { linkedTaxa } from 'ui/screens/common/linked-taxa';
import { renderTemplate } from 'ui/helpers/templating';

import detailsTemplate from 'ui/screens/common/info-detail-slider-template.html';

export const renderInfoDetails = (item, activeTraitKey, activeTraitValue) => {

    const { config, collection } = store.getState();

    const container = document.querySelector('.js-card-scrollable-container');

    if(activeTraitKey.toLowerCase() === 'description') {        
        container.classList.remove('hide-important');
        const idNode = container.querySelector('.id-box > div:nth-child(2) > div');
        idNode.innerHTML = activeTraitValue;
    }
    else if(activeTraitKey.toLowerCase() === 'relationships' || activeTraitKey.toLowerCase() === 'lookalikes') {
        container.classList.add('hide-important');
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
            details.length === 0
                ? container.classList.remove('hide-important')
                : container.classList.add('hide-important');
        } else {            
            detailsContainer.innerHTML = '';
        }

        renderTemplate({ details }, detailsContainer.content, parent);
    }
};