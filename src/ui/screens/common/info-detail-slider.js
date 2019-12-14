import { store } from 'redux/store';
import { firestore } from 'api/firebase/firestore';
import { linkedTaxa } from 'ui/screens/common/linked-taxa';
import { renderTemplate } from 'ui/helpers/templating';

import idBoxTemplate from 'ui/screens/common/id-box-template.html';
import detailsTemplate from 'ui/screens/common/info-detail-slider-template.html';

export const renderInfoDetails = (item, activeTraitKey, activeTraitValue, description) => {

    const { config, collection } = store.getState();

    const template = document.createElement('template');
    const parent = document.querySelector('.js-info-box-details');


    if(!parent) return; // hack! currently the case with (non-species) taxon cards (see same below)

    parent.innerHTML = '';

    if(activeTraitKey.toLowerCase().indexOf('description') > -1) {        
        template.innerHTML = idBoxTemplate;
        renderTemplate({ id: activeTraitValue }, template.content, parent);
        const text = document.querySelector('.id-box > div:nth-child(2) > div');
              text.innerHTML = text.innerHTML.replace(/\r?\n/g, '<br />');        
    }
    else if(activeTraitKey.toLowerCase() === 'relationships' || activeTraitKey.toLowerCase() === 'lookalikes') {
        const mode = 'MODAL';
        const isInCarousel = true;
        linkedTaxa(item, config, parent, mode, isInCarousel, collection, activeTraitValue);
    } else {

        const details = firestore.getDefinition(activeTraitValue, collection.glossary); // make dependent on a promise

        if(!parent) return; // hack! taxon info sliders

        if(details && details.length > 0) {            
            details.forEach(detail => {
                template.innerHTML = detailsTemplate;
                detail.imgClassName = detail.img ? detail.img.url === '' ? 'hide-important' : '' : 'hide-important';
                detail.img = detail.img || { url: '' }; 
            });
            renderTemplate({ details }, template.content, parent);
        }
    }
};